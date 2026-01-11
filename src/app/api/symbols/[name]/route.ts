/**
 * Single Dream Symbol API Route
 *
 * GET /api/symbols/[name]
 *
 * Public endpoint for fetching a single dream symbol by name.
 * No authentication required.
 *
 * Path parameter:
 * - name: Symbol name (exact match or alias - Chinese, English, or pinyin)
 *
 * Response:
 * {
 *   symbol: DreamSymbol;            // Full symbol data
 *   interpretations: {              // Interpretations organized by school
 *     traditional: SymbolInterpretation[];
 *     freudian?: string;
 *     jungian?: string;
 *   };
 *   relatedSymbols: RelatedSymbolInfo[];
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getSymbolByName,
  getSymbolById,
  SYMBOL_NAME_INDEX,
  DREAM_SYMBOLS,
  type DreamSymbol,
  type SymbolInterpretation,
  type RelatedSymbol,
} from '@/lib/knowledge/symbols';
import { getCategoryById } from '@/lib/knowledge/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Related symbol with resolved details
 */
interface RelatedSymbolInfo {
  symbolId: string;
  name: string;
  nameEn: string;
  pinyin: string;
  relationship: RelatedSymbol['relationship'];
  combinedMeaning?: string;
}

/**
 * Full symbol response with organized interpretations
 */
interface SymbolDetailResponse {
  symbol: DreamSymbol;
  category: {
    id: string;
    name: string;
    nameEn: string;
    description: string;
  } | null;
  interpretations: {
    traditional: SymbolInterpretation[];
    freudian: string | null;
    jungian: string | null;
  };
  relatedSymbols: RelatedSymbolInfo[];
}

/**
 * Find symbol by name, alias, pinyin, or ID
 */
function findSymbol(nameOrId: string): DreamSymbol | undefined {
  // Try by ID first
  const byId = getSymbolById(nameOrId);
  if (byId) return byId;

  // Try by name/alias (includes Chinese names, English names, aliases)
  const byName = getSymbolByName(nameOrId);
  if (byName) return byName;

  // Try case-insensitive pinyin search
  const normalizedInput = nameOrId.toLowerCase().trim();
  for (const [key, symbolId] of SYMBOL_NAME_INDEX.entries()) {
    // Check if any indexed name matches (case-insensitive for English/pinyin)
    if (key.toLowerCase() === normalizedInput) {
      return DREAM_SYMBOLS.get(symbolId);
    }
  }

  // Try pinyin direct match
  for (const symbol of DREAM_SYMBOLS.values()) {
    if (symbol.pinyin.toLowerCase() === normalizedInput) {
      return symbol;
    }
  }

  return undefined;
}

/**
 * Resolve related symbols to include their names
 */
function resolveRelatedSymbols(relatedSymbols: RelatedSymbol[]): RelatedSymbolInfo[] {
  const results: RelatedSymbolInfo[] = [];

  for (const related of relatedSymbols) {
    const symbol = getSymbolById(related.symbolId);
    if (!symbol) continue;

    results.push({
      symbolId: related.symbolId,
      name: symbol.name,
      nameEn: symbol.nameEn,
      pinyin: symbol.pinyin,
      relationship: related.relationship,
      combinedMeaning: related.combinedMeaning,
    });
  }

  return results;
}

/**
 * Organize interpretations by school of thought
 */
function organizeInterpretations(symbol: DreamSymbol) {
  // Traditional interpretations from classical sources
  const traditional = symbol.interpretations.filter(
    (interp) =>
      interp.source.reliability === 'canonical' ||
      interp.source.reliability === 'traditional' ||
      interp.source.reliability === 'folk'
  );

  // Psychological analysis is stored in psychologicalAnalysis field
  // We can derive Freudian/Jungian interpretations from it or the content
  const psychAnalysis = symbol.psychologicalAnalysis || null;

  // For now, we'll use the psychological analysis as a combined modern interpretation
  // In the future, this could be expanded with separate Freudian and Jungian fields
  return {
    traditional,
    freudian: psychAnalysis, // Could be separated in future data model
    jungian: psychAnalysis, // Could be separated in future data model
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    // Decode URI component (handles Chinese characters and special chars)
    const decodedName = decodeURIComponent(name);

    // Find the symbol
    const symbol = findSymbol(decodedName);

    if (!symbol) {
      return NextResponse.json(
        {
          error: `Symbol not found: ${decodedName}`,
          suggestion: 'Use /api/symbols?q=<keyword> to search for symbols',
        },
        { status: 404 }
      );
    }

    // Get category details
    const categoryInfo = getCategoryById(symbol.category.primary);
    const categoryData = categoryInfo
      ? {
          id: categoryInfo.id,
          name: categoryInfo.name,
          nameEn: categoryInfo.nameEn,
          description: categoryInfo.description,
        }
      : null;

    // Organize interpretations
    const interpretations = organizeInterpretations(symbol);

    // Resolve related symbols
    const relatedSymbols = resolveRelatedSymbols(symbol.relatedSymbols);

    const response: SymbolDetailResponse = {
      symbol,
      category: categoryData,
      interpretations,
      relatedSymbols,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Symbol Detail API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch symbol';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
