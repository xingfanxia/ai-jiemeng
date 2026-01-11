/**
 * Dream Symbols API Route
 *
 * GET /api/symbols
 *
 * Public endpoint for searching and listing dream symbols.
 * No authentication required.
 *
 * Query parameters:
 * - q: string (search query - matches name, pinyin, aliases, keywords)
 * - category: string (filter by category ID)
 * - limit: number (default 20, max 100)
 *
 * Response:
 * {
 *   symbols: DreamSymbolSummary[];
 *   total: number;
 *   limit: number;
 *   query?: string;
 *   category?: string;
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  DREAM_SYMBOLS_DATA,
  searchSymbols,
  getSymbolsByCategory,
  type DreamSymbol,
} from '@/lib/knowledge/symbols';
import { getCategoryById } from '@/lib/knowledge/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Summary view of a symbol (excludes full interpretation details for list view)
 */
interface DreamSymbolSummary {
  id: string;
  name: string;
  pinyin: string;
  nameEn: string;
  aliases: string[];
  category: {
    primary: string;
    secondary?: string;
    tags: string[];
  };
  interpretationCount: number;
  luckyNumbers?: number[];
}

/**
 * Transform full symbol to summary view
 */
function toSymbolSummary(symbol: DreamSymbol): DreamSymbolSummary {
  return {
    id: symbol.id,
    name: symbol.name,
    pinyin: symbol.pinyin,
    nameEn: symbol.nameEn,
    aliases: symbol.aliases,
    category: symbol.category,
    interpretationCount: symbol.interpretations.length,
    luckyNumbers: symbol.luckyNumbers,
  };
}

/**
 * Advanced search that matches name, pinyin, aliases, and keywords
 */
function advancedSearchSymbols(query: string): DreamSymbol[] {
  const normalizedQuery = query.toLowerCase().trim();
  const results: DreamSymbol[] = [];

  for (const symbol of DREAM_SYMBOLS_DATA) {
    // Check name (Chinese)
    if (symbol.name.includes(query)) {
      results.push(symbol);
      continue;
    }

    // Check pinyin
    if (symbol.pinyin.toLowerCase().includes(normalizedQuery)) {
      results.push(symbol);
      continue;
    }

    // Check English name
    if (symbol.nameEn.toLowerCase().includes(normalizedQuery)) {
      results.push(symbol);
      continue;
    }

    // Check aliases
    if (symbol.aliases.some((alias) => alias.includes(query))) {
      results.push(symbol);
      continue;
    }

    // Check keywords
    if (symbol.keywords.some((kw) => kw.includes(query))) {
      results.push(symbol);
      continue;
    }
  }

  return results;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const query = searchParams.get('q')?.trim() || '';
    const category = searchParams.get('category')?.trim() || '';
    const limitParam = searchParams.get('limit');
    const limit = Math.min(Math.max(parseInt(limitParam || '20', 10) || 20, 1), 100);

    let symbols: DreamSymbol[] = [];

    // Apply filters
    if (query && category) {
      // Both query and category: search first, then filter by category
      const searchResults = advancedSearchSymbols(query);
      symbols = searchResults.filter((s) => s.category.primary === category);
    } else if (query) {
      // Query only: search by name, pinyin, aliases, keywords
      symbols = advancedSearchSymbols(query);
    } else if (category) {
      // Category only: filter by category
      // Validate category exists
      const categoryInfo = getCategoryById(category);
      if (!categoryInfo) {
        return NextResponse.json(
          {
            error: `Invalid category: ${category}`,
            validCategories: DREAM_SYMBOLS_DATA.reduce((cats, s) => {
              if (!cats.includes(s.category.primary)) cats.push(s.category.primary);
              return cats;
            }, [] as string[]),
          },
          { status: 400 }
        );
      }
      symbols = getSymbolsByCategory(category);
    } else {
      // No filters: return all symbols
      symbols = [...DREAM_SYMBOLS_DATA];
    }

    // Calculate total before limiting
    const total = symbols.length;

    // Apply limit
    const limitedSymbols = symbols.slice(0, limit);

    // Transform to summary view
    const symbolSummaries = limitedSymbols.map(toSymbolSummary);

    return NextResponse.json({
      symbols: symbolSummaries,
      total,
      limit,
      ...(query && { query }),
      ...(category && { category }),
    });
  } catch (error) {
    console.error('[Symbols API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch symbols';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
