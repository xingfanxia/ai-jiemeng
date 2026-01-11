/**
 * Dream Interpretation Knowledge Base - Core Dream Symbols
 *
 * Contains 50+ common dream symbols with their interpretations
 * based on traditional Chinese dream interpretation (Zhou Gong)
 * and Dunhuang dream manuscripts.
 */

import type { FortuneType, FortuneAspect } from './fortune';
import type { InterpretationCondition } from './conditions';

// ==================== Type Definitions ====================

/**
 * Source of the interpretation
 */
export interface InterpretationSource {
  /** Book/source name */
  bookName: string;
  /** Dynasty/era */
  dynasty?: string;
  /** Original classical Chinese text */
  originalText?: string;
  /** Reliability level */
  reliability: 'canonical' | 'traditional' | 'folk' | 'modern';
}

/**
 * Single interpretation entry for a symbol
 */
export interface SymbolInterpretation {
  /** Interpretation ID */
  id: string;
  /** Interpretation content in Chinese */
  content: string;
  /** English translation */
  contentEn?: string;
  /** Fortune assessment */
  fortune: {
    type: FortuneType;
    score: number;
    /** Aspect-specific fortunes */
    aspects?: Partial<Record<FortuneAspect, number>>;
  };
  /** Conditions under which this interpretation applies */
  conditions?: InterpretationCondition;
  /** Source of this interpretation */
  source: InterpretationSource;
  /** Weight for sorting/priority (higher = more authoritative) */
  weight: number;
}

/**
 * Related symbol connection
 */
export interface RelatedSymbol {
  /** Related symbol ID */
  symbolId: string;
  /** Type of relationship */
  relationship: 'combined' | 'opposite' | 'similar' | 'sequential';
  /** Combined meaning when appearing together */
  combinedMeaning?: string;
}

/**
 * Complete dream symbol definition
 */
export interface DreamSymbol {
  /** Unique identifier */
  id: string;
  /** Primary name in Chinese */
  name: string;
  /** Pinyin romanization */
  pinyin: string;
  /** English name */
  nameEn: string;
  /** Alternative names/aliases */
  aliases: string[];
  /** Category information */
  category: {
    primary: string;   // Category ID
    secondary?: string; // Subcategory ID
    tags: string[];
  };
  /** All interpretations for this symbol */
  interpretations: SymbolInterpretation[];
  /** Related symbols */
  relatedSymbols: RelatedSymbol[];
  /** Modern psychological interpretation */
  psychologicalAnalysis?: string;
  /** Lucky numbers associated with this symbol */
  luckyNumbers?: number[];
  /** Keywords for search/matching */
  keywords: string[];
}

// ==================== Dream Symbols Data ====================

/**
 * Core dream symbols collection - 50+ common symbols
 */
export const DREAM_SYMBOLS_DATA: DreamSymbol[] = [
  // ==================== Animals ====================
  {
    id: 'snake',
    name: '蛇',
    pinyin: 'she',
    nameEn: 'Snake',
    aliases: ['大蛇', '毒蛇', '青蛇', '白蛇', '长虫', '蟒蛇'],
    category: {
      primary: 'animals',
      secondary: 'reptiles',
      tags: ['常见梦象', '吉凶两面', '胎梦'],
    },
    interpretations: [
      {
        id: 'snake_001',
        content: '梦见蛇，主迁移。',
        contentEn: 'Dreaming of a snake indicates relocation or change.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见蛇，主迁移',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'snake_002',
        content: '孕妇梦见蛇入怀，主生贵子，大吉。',
        contentEn: 'A pregnant woman dreaming of a snake entering her bosom indicates she will give birth to a noble son.',
        fortune: { type: 'da_ji', score: 90, aspects: { family: 95, health: 85 } },
        conditions: {
          dreamerIdentity: { specialStatus: 'pregnant' },
        },
        source: {
          bookName: '梦林玄解',
          dynasty: '明',
          originalText: '孕妇梦蛇入怀，主生贵子',
          reliability: 'canonical',
        },
        weight: 0.95,
      },
      {
        id: 'snake_003',
        content: '梦见被蛇咬，主得大财，不怕凶险。',
        contentEn: 'Dreaming of being bitten by a snake indicates great wealth coming.',
        fortune: { type: 'ji', score: 75, aspects: { wealth: 85 } },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'snake_004',
        content: '梦见杀蛇，主大吉利。',
        contentEn: 'Dreaming of killing a snake indicates great fortune.',
        fortune: { type: 'ji', score: 80 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dragon', relationship: 'similar', combinedMeaning: '蛇化龙，主飞黄腾达' },
      { symbolId: 'water', relationship: 'combined', combinedMeaning: '蛇在水中，主迁事吉' },
    ],
    psychologicalAnalysis: '蛇象征本能能量、转化（蜕皮）、潜意识力量，也可能代表性欲或恐惧。',
    luckyNumbers: [2, 8, 12],
    keywords: ['蛇', '毒蛇', '蟒蛇', '蛇咬', '蛇入怀'],
  },
  {
    id: 'dragon',
    name: '龙',
    pinyin: 'long',
    nameEn: 'Dragon',
    aliases: ['神龙', '金龙', '青龙', '飞龙'],
    category: {
      primary: 'animals',
      secondary: 'mythical',
      tags: ['大吉', '权贵', '胎梦'],
    },
    interpretations: [
      {
        id: 'dragon_001',
        content: '梦见龙，必富贵。',
        contentEn: 'Dreaming of a dragon indicates wealth and nobility.',
        fortune: { type: 'da_ji', score: 95, aspects: { career: 95, wealth: 90 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见龙，必富贵',
          reliability: 'canonical',
        },
        weight: 0.95,
      },
      {
        id: 'dragon_002',
        content: '孕妇梦见龙，主生贵子，将来必成大器。',
        contentEn: 'A pregnant woman dreaming of a dragon will give birth to a noble child destined for greatness.',
        fortune: { type: 'da_ji', score: 98, aspects: { family: 98 } },
        conditions: {
          dreamerIdentity: { specialStatus: 'pregnant' },
        },
        source: {
          bookName: '梦林玄解',
          dynasty: '明',
          reliability: 'canonical',
        },
        weight: 0.98,
      },
      {
        id: 'dragon_003',
        content: '梦见骑龙上天，主大贵。',
        contentEn: 'Dreaming of riding a dragon to the sky indicates great honor.',
        fortune: { type: 'da_ji', score: 95, aspects: { career: 98 } },
        conditions: {
          dreamDetails: { action: 'flying' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
    ],
    relatedSymbols: [
      { symbolId: 'phoenix', relationship: 'combined', combinedMeaning: '龙凤呈祥，大吉大利' },
      { symbolId: 'snake', relationship: 'similar' },
      { symbolId: 'clouds', relationship: 'combined', combinedMeaning: '龙腾云起，事业腾飞' },
    ],
    psychologicalAnalysis: '龙在中国文化中象征权力、尊贵、成功和保护，代表内心对成就和地位的渴望。',
    luckyNumbers: [1, 6, 8, 9],
    keywords: ['龙', '神龙', '金龙', '飞龙', '骑龙'],
  },
  {
    id: 'fish',
    name: '鱼',
    pinyin: 'yu',
    nameEn: 'Fish',
    aliases: ['金鱼', '鲤鱼', '大鱼', '小鱼'],
    category: {
      primary: 'animals',
      secondary: 'aquatic',
      tags: ['财运', '常见梦象'],
    },
    interpretations: [
      {
        id: 'fish_001',
        content: '梦见鱼，百事如意。',
        contentEn: 'Dreaming of fish indicates everything will go smoothly.',
        fortune: { type: 'ji', score: 80, aspects: { wealth: 85, overall: 80 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见鱼者，百事如意',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'fish_002',
        content: '梦见捉鱼，主得财利。',
        contentEn: 'Dreaming of catching fish indicates financial gain.',
        fortune: { type: 'ji', score: 82, aspects: { wealth: 90 } },
        conditions: {
          dreamDetails: { action: 'catching' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'fish_003',
        content: '梦见鱼在水中游，主事业顺利。',
        contentEn: 'Dreaming of fish swimming in water indicates career success.',
        fortune: { type: 'ji', score: 78, aspects: { career: 85, wealth: 75 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'combined', combinedMeaning: '鱼水相依，万事顺遂' },
    ],
    psychologicalAnalysis: '鱼象征财富（因"鱼"与"余"谐音）、生育力和潜意识的内容。',
    luckyNumbers: [3, 6, 9],
    keywords: ['鱼', '钓鱼', '捉鱼', '金鱼', '鲤鱼', '鱼跃'],
  },
  {
    id: 'dog',
    name: '狗',
    pinyin: 'gou',
    nameEn: 'Dog',
    aliases: ['犬', '小狗', '猎犬', '狼狗'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['常见梦象', '忠诚'],
    },
    interpretations: [
      {
        id: 'dog_001',
        content: '梦见狗咬人，贵客来。',
        contentEn: 'Dreaming of a dog biting someone indicates an important guest will visit.',
        fortune: { type: 'ji', score: 70 },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见犬咬人，贵客来',
          reliability: 'canonical',
        },
        weight: 0.85,
      },
      {
        id: 'dog_002',
        content: '梦见狗对自己叫，有口舌之争。',
        contentEn: 'Dreaming of a dog barking at you indicates verbal disputes.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'dog_003',
        content: '梦见被狗追，主有小人暗害。',
        contentEn: 'Dreaming of being chased by a dog indicates someone is plotting against you.',
        fortune: { type: 'xiong', score: 30 },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '狗象征忠诚、友谊、保护，也可能代表本能或被压抑的攻击性。',
    luckyNumbers: [2, 5, 8],
    keywords: ['狗', '犬', '狗咬', '狗叫', '被狗追'],
  },
  {
    id: 'tiger',
    name: '虎',
    pinyin: 'hu',
    nameEn: 'Tiger',
    aliases: ['老虎', '猛虎', '白虎'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['权威', '危险'],
    },
    interpretations: [
      {
        id: 'tiger_001',
        content: '梦见虎，主富贵荣华。',
        contentEn: 'Dreaming of a tiger indicates wealth and honor.',
        fortune: { type: 'ji', score: 78, aspects: { career: 85, wealth: 75 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'tiger_002',
        content: '梦见被虎追，主有贵人相助。',
        contentEn: 'Dreaming of being chased by a tiger indicates help from a noble person.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'tiger_003',
        content: '梦见骑虎，主大贵。',
        contentEn: 'Dreaming of riding a tiger indicates great honor.',
        fortune: { type: 'da_ji', score: 88, aspects: { career: 92 } },
        source: {
          bookName: '梦林玄解',
          dynasty: '明',
          reliability: 'canonical',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dragon', relationship: 'combined', combinedMeaning: '龙虎相争，事业竞争激烈' },
    ],
    psychologicalAnalysis: '虎象征力量、勇气、权威，也可能代表内心的恐惧或攻击性冲动。',
    luckyNumbers: [3, 7, 9],
    keywords: ['虎', '老虎', '猛虎', '白虎', '骑虎'],
  },
  {
    id: 'horse',
    name: '马',
    pinyin: 'ma',
    nameEn: 'Horse',
    aliases: ['白马', '骏马', '黑马', '野马'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['事业', '出行'],
    },
    interpretations: [
      {
        id: 'horse_001',
        content: '梦见骑马，主远行或升迁。',
        contentEn: 'Dreaming of riding a horse indicates travel or promotion.',
        fortune: { type: 'ji', score: 80, aspects: { career: 85, travel: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'horse_002',
        content: '梦见白马，主大吉。',
        contentEn: 'Dreaming of a white horse indicates great fortune.',
        fortune: { type: 'da_ji', score: 88 },
        conditions: {
          dreamDetails: { color: 'white' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'horse_003',
        content: '梦见马奔跑，主事业进展迅速。',
        contentEn: 'Dreaming of a running horse indicates rapid career progress.',
        fortune: { type: 'ji', score: 82, aspects: { career: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '马象征自由、力量、性能量和前进的动力。',
    luckyNumbers: [1, 4, 7],
    keywords: ['马', '骑马', '白马', '骏马', '马跑'],
  },
  {
    id: 'cat',
    name: '猫',
    pinyin: 'mao',
    nameEn: 'Cat',
    aliases: ['小猫', '黑猫', '白猫', '野猫'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['常见梦象'],
    },
    interpretations: [
      {
        id: 'cat_001',
        content: '梦见猫，主有小人暗算。',
        contentEn: 'Dreaming of a cat indicates someone may be plotting against you.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'cat_002',
        content: '女性梦见猫，主感情有变。',
        contentEn: 'A woman dreaming of a cat indicates changes in relationships.',
        fortune: { type: 'zhong_ping', score: 50, aspects: { love: 45 } },
        conditions: {
          dreamerIdentity: { gender: 'female' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
      {
        id: 'cat_003',
        content: '梦见猫捉老鼠，主有财利。',
        contentEn: 'Dreaming of a cat catching mice indicates financial gain.',
        fortune: { type: 'ji', score: 72, aspects: { wealth: 78 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'mouse', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '猫象征女性特质、独立性、神秘感，也可能代表直觉或性欲。',
    luckyNumbers: [2, 6, 9],
    keywords: ['猫', '小猫', '黑猫', '白猫', '猫叫'],
  },
  {
    id: 'bird',
    name: '鸟',
    pinyin: 'niao',
    nameEn: 'Bird',
    aliases: ['小鸟', '飞鸟', '喜鹊', '乌鸦'],
    category: {
      primary: 'animals',
      secondary: 'birds',
      tags: ['自由', '消息'],
    },
    interpretations: [
      {
        id: 'bird_001',
        content: '梦见鸟飞，主有好消息。',
        contentEn: 'Dreaming of flying birds indicates good news coming.',
        fortune: { type: 'ji', score: 75 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'bird_002',
        content: '梦见喜鹊，主有喜事。',
        contentEn: 'Dreaming of a magpie indicates joyful events.',
        fortune: { type: 'ji', score: 82 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'bird_003',
        content: '梦见乌鸦，主有凶事。',
        contentEn: 'Dreaming of a crow indicates misfortune.',
        fortune: { type: 'xiong', score: 30 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'phoenix', relationship: 'similar' },
    ],
    psychologicalAnalysis: '鸟象征自由、灵性、思想和超越，代表渴望摆脱束缚。',
    luckyNumbers: [3, 7, 9],
    keywords: ['鸟', '小鸟', '飞鸟', '喜鹊', '乌鸦', '鸟飞'],
  },

  // ==================== Body Parts ====================
  {
    id: 'teeth',
    name: '牙齿',
    pinyin: 'yachi',
    nameEn: 'Teeth',
    aliases: ['牙', '掉牙', '拔牙', '门牙'],
    category: {
      primary: 'body',
      secondary: 'teeth_hair',
      tags: ['常见梦象', '亲人'],
    },
    interpretations: [
      {
        id: 'teeth_001',
        content: '梦见掉牙，主亲人有变故。',
        contentEn: 'Dreaming of losing teeth indicates changes affecting family members.',
        fortune: { type: 'xiong', score: 35, aspects: { family: 25, health: 40 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'teeth_002',
        content: '梦见牙齿脱落出血，主破财。',
        contentEn: 'Dreaming of teeth falling with blood indicates financial loss.',
        fortune: { type: 'xiong', score: 30, aspects: { wealth: 20 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'teeth_003',
        content: '梦见长新牙，主有子孙之喜。',
        contentEn: 'Dreaming of growing new teeth indicates joy from children or grandchildren.',
        fortune: { type: 'ji', score: 78, aspects: { family: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '掉牙梦常与焦虑、变化、失去控制感或衰老恐惧有关。',
    luckyNumbers: [1, 4, 6],
    keywords: ['牙', '牙齿', '掉牙', '拔牙', '牙掉', '牙脱落'],
  },
  {
    id: 'hair',
    name: '头发',
    pinyin: 'toufa',
    nameEn: 'Hair',
    aliases: ['发', '长发', '白发', '掉发'],
    category: {
      primary: 'body',
      secondary: 'teeth_hair',
      tags: ['常见梦象'],
    },
    interpretations: [
      {
        id: 'hair_001',
        content: '梦见头发变白，主忧愁。',
        contentEn: 'Dreaming of hair turning white indicates worries.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'hair_002',
        content: '梦见剪头发，主有新开始。',
        contentEn: 'Dreaming of cutting hair indicates a new beginning.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
      {
        id: 'hair_003',
        content: '梦见头发又长又亮，主健康长寿。',
        contentEn: 'Dreaming of long shiny hair indicates health and longevity.',
        fortune: { type: 'ji', score: 75, aspects: { health: 82 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '头发象征力量、生命力、性吸引力和自我形象。',
    luckyNumbers: [3, 6, 9],
    keywords: ['头发', '发', '长发', '白发', '掉发', '剪发'],
  },
  {
    id: 'blood',
    name: '血',
    pinyin: 'xue',
    nameEn: 'Blood',
    aliases: ['鲜血', '流血', '出血'],
    category: {
      primary: 'body',
      secondary: 'organs',
      tags: ['常见梦象', '吉凶两面'],
    },
    interpretations: [
      {
        id: 'blood_001',
        content: '梦见流血，主有财运。',
        contentEn: 'Dreaming of bleeding indicates incoming wealth.',
        fortune: { type: 'ji', score: 72, aspects: { wealth: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'blood_002',
        content: '梦见血染衣，主有口舌是非。',
        contentEn: 'Dreaming of blood-stained clothes indicates disputes.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '血象征生命力、激情、牺牲，也可能代表创伤或失去。',
    luckyNumbers: [6, 8],
    keywords: ['血', '流血', '出血', '鲜血', '血染'],
  },

  // ==================== Natural Elements ====================
  {
    id: 'water',
    name: '水',
    pinyin: 'shui',
    nameEn: 'Water',
    aliases: ['河水', '海水', '洪水', '清水', '浑水'],
    category: {
      primary: 'geography',
      secondary: 'water_bodies',
      tags: ['常见梦象', '情绪'],
    },
    interpretations: [
      {
        id: 'water_001',
        content: '梦见清水，主大吉。',
        contentEn: 'Dreaming of clear water indicates great fortune.',
        fortune: { type: 'ji', score: 80 },
        conditions: {
          dreamDetails: { state: 'bright' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'water_002',
        content: '梦见浑水，主有忧愁。',
        contentEn: 'Dreaming of murky water indicates worries.',
        fortune: { type: 'xiong', score: 38 },
        conditions: {
          dreamDetails: { state: 'dark' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'water_003',
        content: '梦见涉大水而恐惧，主阴气盛，宜泻法。',
        contentEn: 'Dreaming of crossing deep water with fear indicates excess yin energy.',
        fortune: { type: 'xiong', score: 35, aspects: { health: 30 } },
        conditions: {
          dreamDetails: { emotion: 'scared' },
        },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '阴气盛，则梦涉大水而恐惧',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'water_004',
        content: '梦见洪水，主有大变动。',
        contentEn: 'Dreaming of a flood indicates major changes.',
        fortune: { type: 'zhong_ping', score: 45 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'fish', relationship: 'combined', combinedMeaning: '鱼水相依，万事顺遂' },
      { symbolId: 'snake', relationship: 'combined', combinedMeaning: '蛇在水中，主迁事吉' },
    ],
    psychologicalAnalysis: '水象征潜意识、情绪、净化和生命本源。清水代表情绪平静，浑水代表混乱。',
    luckyNumbers: [1, 6, 9],
    keywords: ['水', '河水', '海水', '洪水', '游泳', '涉水'],
  },
  {
    id: 'fire',
    name: '火',
    pinyin: 'huo',
    nameEn: 'Fire',
    aliases: ['大火', '火焰', '燃烧', '着火'],
    category: {
      primary: 'celestial',
      secondary: 'weather',
      tags: ['常见梦象', '激情'],
    },
    interpretations: [
      {
        id: 'fire_001',
        content: '梦见火燔灼，主阳气盛，宜泻法。',
        contentEn: 'Dreaming of burning fire indicates excess yang energy.',
        fortune: { type: 'zhong_ping', score: 50, aspects: { health: 45 } },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '阳气盛，则梦大火燔灼',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'fire_002',
        content: '梦见火烧房屋，主大发财。',
        contentEn: 'Dreaming of a house on fire indicates great wealth.',
        fortune: { type: 'ji', score: 78, aspects: { wealth: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'fire_003',
        content: '梦见火光冲天，主有喜事。',
        contentEn: 'Dreaming of fire reaching the sky indicates joyful events.',
        fortune: { type: 'ji', score: 80 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '火象征激情、愤怒、变革和净化，也可能代表性能量或破坏性冲动。',
    luckyNumbers: [2, 7, 9],
    keywords: ['火', '大火', '火焰', '燃烧', '着火', '火烧'],
  },
  {
    id: 'mountain',
    name: '山',
    pinyin: 'shan',
    nameEn: 'Mountain',
    aliases: ['高山', '大山', '山峰', '爬山'],
    category: {
      primary: 'geography',
      secondary: 'mountains',
      tags: ['成就', '障碍'],
    },
    interpretations: [
      {
        id: 'mountain_001',
        content: '梦见登山者，主高贵。',
        contentEn: 'Dreaming of climbing a mountain indicates nobility and success.',
        fortune: { type: 'ji', score: 82, aspects: { career: 88 } },
        conditions: {
          dreamDetails: { action: 'climbing' },
        },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见登山者，主高贵',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'mountain_002',
        content: '梦见山崩，主有大变故。',
        contentEn: 'Dreaming of a mountain collapsing indicates major upheaval.',
        fortune: { type: 'xiong', score: 25 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'mountain_003',
        content: '梦见山林树木，主肝有邪气。',
        contentEn: 'Dreaming of mountain forests indicates liver-related issues.',
        fortune: { type: 'zhong_ping', score: 48, aspects: { health: 42 } },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '厥气客于肝，则梦山林树木',
          reliability: 'canonical',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '山象征障碍、成就、稳定和精神追求。登山代表克服困难追求目标。',
    luckyNumbers: [3, 5, 8],
    keywords: ['山', '高山', '大山', '山峰', '爬山', '登山', '山崩'],
  },
  {
    id: 'sun',
    name: '太阳',
    pinyin: 'taiyang',
    nameEn: 'Sun',
    aliases: ['日', '日出', '日落', '阳光'],
    category: {
      primary: 'celestial',
      secondary: 'sun_moon',
      tags: ['权贵', '能量'],
    },
    interpretations: [
      {
        id: 'sun_001',
        content: '梦见日初出，名位升。',
        contentEn: 'Dreaming of sunrise indicates rise in status.',
        fortune: { type: 'da_ji', score: 90, aspects: { career: 95 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见日初出，名位升',
          reliability: 'canonical',
        },
        weight: 0.95,
      },
      {
        id: 'sun_002',
        content: '梦见日落，主事业有变。',
        contentEn: 'Dreaming of sunset indicates career changes.',
        fortune: { type: 'zhong_ping', score: 50, aspects: { career: 45 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'sun_003',
        content: '梦见烈日当空，主有贵人提携。',
        contentEn: 'Dreaming of bright sun overhead indicates help from noble persons.',
        fortune: { type: 'ji', score: 82 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [
      { symbolId: 'moon', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '太阳象征意识、理性、权威、父性和生命能量。',
    luckyNumbers: [1, 6, 9],
    keywords: ['太阳', '日', '日出', '日落', '阳光', '烈日'],
  },
  {
    id: 'moon',
    name: '月亮',
    pinyin: 'yueliang',
    nameEn: 'Moon',
    aliases: ['月', '明月', '满月', '月光'],
    category: {
      primary: 'celestial',
      secondary: 'sun_moon',
      tags: ['阴柔', '情感'],
    },
    interpretations: [
      {
        id: 'moon_001',
        content: '梦见明月，主有贵人相助。',
        contentEn: 'Dreaming of a bright moon indicates help from noble persons.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'moon_002',
        content: '梦见月缺，主有小失。',
        contentEn: 'Dreaming of a waning moon indicates minor losses.',
        fortune: { type: 'zhong_ping', score: 48 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'moon_003',
        content: '女性梦见满月，主有喜孕。',
        contentEn: 'A woman dreaming of a full moon indicates pregnancy.',
        fortune: { type: 'ji', score: 85, aspects: { family: 90 } },
        conditions: {
          dreamerIdentity: { gender: 'female' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [
      { symbolId: 'sun', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '月亮象征潜意识、情感、女性特质、直觉和周期性变化。',
    luckyNumbers: [2, 6, 8],
    keywords: ['月亮', '月', '明月', '满月', '月光', '月缺'],
  },
  {
    id: 'rain',
    name: '雨',
    pinyin: 'yu',
    nameEn: 'Rain',
    aliases: ['下雨', '大雨', '暴雨', '细雨'],
    category: {
      primary: 'celestial',
      secondary: 'weather',
      tags: ['情绪', '净化'],
    },
    interpretations: [
      {
        id: 'rain_001',
        content: '梦见下雨，主有财运。',
        contentEn: 'Dreaming of rain indicates incoming wealth.',
        fortune: { type: 'ji', score: 75, aspects: { wealth: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'rain_002',
        content: '梦见暴雨，主有大变动。',
        contentEn: 'Dreaming of heavy rain indicates major changes.',
        fortune: { type: 'zhong_ping', score: 50 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'rain_003',
        content: '梦见雨过天晴，主困难过后有好转。',
        contentEn: 'Dreaming of clearing after rain indicates improvement after difficulties.',
        fortune: { type: 'ji', score: 82 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [
      { symbolId: 'thunder', relationship: 'combined' },
    ],
    psychologicalAnalysis: '雨象征净化、情绪释放、悲伤或恩赐。',
    luckyNumbers: [3, 6, 9],
    keywords: ['雨', '下雨', '大雨', '暴雨', '细雨', '淋雨'],
  },
  {
    id: 'thunder',
    name: '雷',
    pinyin: 'lei',
    nameEn: 'Thunder',
    aliases: ['打雷', '雷电', '闪电', '惊雷'],
    category: {
      primary: 'celestial',
      secondary: 'weather',
      tags: ['震惊', '变化'],
    },
    interpretations: [
      {
        id: 'thunder_001',
        content: '梦见打雷，主有惊喜或变动。',
        contentEn: 'Dreaming of thunder indicates surprises or changes.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'thunder_002',
        content: '梦见雷声大作，主有贵人降临。',
        contentEn: 'Dreaming of loud thunder indicates arrival of important people.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'rain', relationship: 'combined' },
    ],
    psychologicalAnalysis: '雷象征突然的启示、愤怒爆发或重大变化的预兆。',
    luckyNumbers: [1, 5, 7],
    keywords: ['雷', '打雷', '雷电', '闪电', '惊雷'],
  },
  {
    id: 'earthquake',
    name: '地震',
    pinyin: 'dizhen',
    nameEn: 'Earthquake',
    aliases: ['地动', '地裂'],
    category: {
      primary: 'geography',
      secondary: 'natural_disasters',
      tags: ['大变动', '不稳定'],
    },
    interpretations: [
      {
        id: 'earthquake_001',
        content: '梦见地动，忧移徙。',
        contentEn: 'Dreaming of earthquake indicates worry about relocation.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见地动，忧移徙',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'earthquake_002',
        content: '梦见地震平安无事，主逢凶化吉。',
        contentEn: 'Dreaming of surviving an earthquake unharmed indicates turning bad luck to good.',
        fortune: { type: 'ji', score: 70 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '地震象征生活基础的动摇、重大变化或内心的不安。',
    luckyNumbers: [4, 7],
    keywords: ['地震', '地动', '地裂', '大地震'],
  },

  // ==================== Activities ====================
  {
    id: 'flying',
    name: '飞翔',
    pinyin: 'feixiang',
    nameEn: 'Flying',
    aliases: ['飞', '飞行', '飞起来'],
    category: {
      primary: 'activities',
      secondary: 'movement',
      tags: ['常见梦象', '自由'],
    },
    interpretations: [
      {
        id: 'flying_001',
        content: '梦见飞，主上盛（气血上涌）。',
        contentEn: 'Dreaming of flying indicates upward energy flow.',
        fortune: { type: 'zhong_ping', score: 55, aspects: { health: 50 } },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '上盛则梦飞',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'flying_002',
        content: '梦见自己飞翔，主事业高升。',
        contentEn: 'Dreaming of yourself flying indicates career advancement.',
        fortune: { type: 'ji', score: 80, aspects: { career: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'flying_003',
        content: '梦见飞不起来，主有阻碍。',
        contentEn: 'Dreaming of being unable to fly indicates obstacles.',
        fortune: { type: 'xiong', score: 40 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'falling', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '飞翔梦象征自由、超越限制、野心，也可能代表逃避现实。',
    luckyNumbers: [1, 7, 9],
    keywords: ['飞', '飞翔', '飞行', '飞起来', '在天上飞'],
  },
  {
    id: 'falling',
    name: '坠落',
    pinyin: 'zhuiluo',
    nameEn: 'Falling',
    aliases: ['掉落', '摔倒', '掉下去', '从高处掉下'],
    category: {
      primary: 'activities',
      secondary: 'movement',
      tags: ['常见梦象', '焦虑'],
    },
    interpretations: [
      {
        id: 'falling_001',
        content: '梦见堕落，主下盛（气血下沉）。',
        contentEn: 'Dreaming of falling indicates downward energy flow.',
        fortune: { type: 'zhong_ping', score: 48, aspects: { health: 45 } },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '下盛则梦堕',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'falling_002',
        content: '梦见从高处坠落，主有失意之事。',
        contentEn: 'Dreaming of falling from height indicates disappointment.',
        fortune: { type: 'xiong', score: 35, aspects: { career: 30 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'falling_003',
        content: '梦见坠落后平安着地，主逢凶化吉。',
        contentEn: 'Dreaming of landing safely after falling indicates turning misfortune to fortune.',
        fortune: { type: 'ji', score: 68 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'flying', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '坠落梦常与失控感、焦虑、不安全感或对失败的恐惧有关。',
    luckyNumbers: [2, 4, 6],
    keywords: ['坠落', '掉落', '摔倒', '掉下去', '从高处掉下', '坠楼'],
  },
  {
    id: 'chasing',
    name: '追逐',
    pinyin: 'zhuizhu',
    nameEn: 'Being Chased',
    aliases: ['被追', '被人追', '逃跑', '追赶'],
    category: {
      primary: 'activities',
      secondary: 'movement',
      tags: ['常见梦象', '焦虑'],
    },
    interpretations: [
      {
        id: 'chasing_001',
        content: '梦见被追赶，主有压力或逃避。',
        contentEn: 'Dreaming of being chased indicates pressure or avoidance.',
        fortune: { type: 'zhong_ping', score: 45 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'chasing_002',
        content: '梦见追人不及，主事不成。',
        contentEn: 'Dreaming of chasing but not catching indicates failure.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
      {
        id: 'chasing_003',
        content: '梦见被追后成功逃脱，主渡过难关。',
        contentEn: 'Dreaming of escaping after being chased indicates overcoming difficulties.',
        fortune: { type: 'ji', score: 70 },
        conditions: {
          dreamDetails: { action: 'escaping' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '被追梦常与逃避问题、压力、恐惧或未解决的冲突有关。',
    luckyNumbers: [3, 5, 8],
    keywords: ['追逐', '被追', '被人追', '逃跑', '追赶', '被追杀'],
  },
  {
    id: 'exam',
    name: '考试',
    pinyin: 'kaoshi',
    nameEn: 'Exam',
    aliases: ['测验', '考试迟到', '考试不会', '考不好'],
    category: {
      primary: 'activities',
      secondary: 'work',
      tags: ['常见梦象', '焦虑', '学业'],
    },
    interpretations: [
      {
        id: 'exam_001',
        content: '梦见考试顺利，主有好运。',
        contentEn: 'Dreaming of passing an exam smoothly indicates good luck.',
        fortune: { type: 'ji', score: 78, aspects: { study: 85, career: 75 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'exam_002',
        content: '梦见考试不会做题，主对自己要求过高。',
        contentEn: 'Dreaming of failing an exam indicates setting too high expectations.',
        fortune: { type: 'zhong_ping', score: 50, aspects: { study: 45 } },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.7,
      },
      {
        id: 'exam_003',
        content: '梦见考试迟到，主有焦虑或准备不足之感。',
        contentEn: 'Dreaming of being late for an exam indicates anxiety or feeling unprepared.',
        fortune: { type: 'xiong', score: 40 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.65,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '考试梦常与对评价的焦虑、准备不足感或自我检验有关。',
    luckyNumbers: [1, 4, 6],
    keywords: ['考试', '测验', '考试迟到', '考试不会', '考不好', '高考'],
  },

  // ==================== People ====================
  {
    id: 'dead_person',
    name: '死人',
    pinyin: 'siren',
    nameEn: 'Dead Person',
    aliases: ['亡人', '死者', '死去的人', '过世的人'],
    category: {
      primary: 'people',
      secondary: 'family',
      tags: ['常见梦象', '反梦'],
    },
    interpretations: [
      {
        id: 'dead_001',
        content: '梦见身死，主长命。',
        contentEn: 'Dreaming of yourself dying indicates long life.',
        fortune: { type: 'ji', score: 75, aspects: { health: 80 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见身死，主长命',
          reliability: 'canonical',
        },
        weight: 0.95,
      },
      {
        id: 'dead_002',
        content: '梦见父母亡，大吉。',
        contentEn: 'Dreaming of parents passing away indicates great fortune.',
        fortune: { type: 'da_ji', score: 85 },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见父母亡，大吉',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'dead_003',
        content: '梦见死去的亲人说话，主有托付之事。',
        contentEn: 'Dreaming of deceased relatives speaking indicates they have something to entrust.',
        fortune: { type: 'zhong_ping', score: 55, aspects: { family: 60 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'dead_004',
        content: '梦见死人复活，主有意外之喜。',
        contentEn: 'Dreaming of dead people coming back to life indicates unexpected joy.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'coffin', relationship: 'combined' },
      { symbolId: 'ghost', relationship: 'similar' },
    ],
    psychologicalAnalysis: '梦见死人常象征结束与新开始、对失去的哀悼、或与过去的联系。',
    luckyNumbers: [4, 7, 9],
    keywords: ['死人', '亡人', '死者', '过世', '死去的人', '已故亲人'],
  },
  {
    id: 'baby',
    name: '婴儿',
    pinyin: 'yinger',
    nameEn: 'Baby',
    aliases: ['小孩', '宝宝', '新生儿', '孩子'],
    category: {
      primary: 'people',
      secondary: 'family',
      tags: ['新生', '希望', '胎梦'],
    },
    interpretations: [
      {
        id: 'baby_001',
        content: '梦见婴儿，主有新开始或新希望。',
        contentEn: 'Dreaming of a baby indicates new beginnings or hope.',
        fortune: { type: 'ji', score: 78, aspects: { family: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'baby_002',
        content: '女性梦见婴儿，主有喜孕之兆。',
        contentEn: 'A woman dreaming of a baby indicates pregnancy.',
        fortune: { type: 'ji', score: 82, aspects: { family: 90 } },
        conditions: {
          dreamerIdentity: { gender: 'female' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'baby_003',
        content: '梦见婴儿哭，主有忧愁之事。',
        contentEn: 'Dreaming of a crying baby indicates worries.',
        fortune: { type: 'xiong', score: 40 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '婴儿象征纯真、新生、创造力、脆弱性或内心的孩童自我。',
    luckyNumbers: [1, 3, 6],
    keywords: ['婴儿', '小孩', '宝宝', '新生儿', '孩子', '小婴儿'],
  },
  {
    id: 'stranger',
    name: '陌生人',
    pinyin: 'moshengren',
    nameEn: 'Stranger',
    aliases: ['不认识的人', '陌生男人', '陌生女人'],
    category: {
      primary: 'people',
      secondary: 'strangers',
      tags: ['常见梦象', '未知'],
    },
    interpretations: [
      {
        id: 'stranger_001',
        content: '梦见陌生人，主有新的机遇。',
        contentEn: 'Dreaming of strangers indicates new opportunities.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
      {
        id: 'stranger_002',
        content: '梦见陌生人帮助自己，主有贵人相助。',
        contentEn: 'Dreaming of strangers helping you indicates support from benefactors.',
        fortune: { type: 'ji', score: 75 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'stranger_003',
        content: '梦见被陌生人追赶，主有隐患。',
        contentEn: 'Dreaming of being chased by strangers indicates hidden dangers.',
        fortune: { type: 'xiong', score: 38 },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '陌生人常代表自我的未知面向、压抑的特质或新的可能性。',
    luckyNumbers: [2, 5, 8],
    keywords: ['陌生人', '不认识的人', '陌生男人', '陌生女人', '生人'],
  },

  // ==================== Supernatural ====================
  {
    id: 'ghost',
    name: '鬼',
    pinyin: 'gui',
    nameEn: 'Ghost',
    aliases: ['鬼魂', '幽灵', '恶鬼', '厉鬼'],
    category: {
      primary: 'supernatural',
      secondary: 'ghosts',
      tags: ['常见梦象', '恐惧'],
    },
    interpretations: [
      {
        id: 'ghost_001',
        content: '梦见鬼，主有小人暗害。',
        contentEn: 'Dreaming of ghosts indicates someone is plotting against you.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'ghost_002',
        content: '梦见鬼缠身，主有病灾。',
        contentEn: 'Dreaming of ghosts clinging to you indicates illness.',
        fortune: { type: 'xiong', score: 28, aspects: { health: 22 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'ghost_003',
        content: '梦见战胜鬼，主逢凶化吉。',
        contentEn: 'Dreaming of defeating ghosts indicates turning misfortune to fortune.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'fighting' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dead_person', relationship: 'similar' },
    ],
    psychologicalAnalysis: '鬼象征恐惧、压抑的情绪、愧疚感或未解决的心理问题。',
    luckyNumbers: [4, 7],
    keywords: ['鬼', '鬼魂', '幽灵', '恶鬼', '厉鬼', '见鬼'],
  },
  {
    id: 'deity',
    name: '神仙',
    pinyin: 'shenxian',
    nameEn: 'Deity',
    aliases: ['神', '菩萨', '佛', '仙人', '神明'],
    category: {
      primary: 'supernatural',
      secondary: 'deities',
      tags: ['大吉', '庇佑'],
    },
    interpretations: [
      {
        id: 'deity_001',
        content: '梦见神仙，主大吉大利。',
        contentEn: 'Dreaming of deities indicates great fortune.',
        fortune: { type: 'da_ji', score: 90 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
      {
        id: 'deity_002',
        content: '梦见菩萨显灵，主有贵人庇佑。',
        contentEn: 'Dreaming of Buddha manifesting indicates divine protection.',
        fortune: { type: 'da_ji', score: 92 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.88,
      },
      {
        id: 'deity_003',
        content: '梦见与神仙交谈，主有启示。',
        contentEn: 'Dreaming of talking with deities indicates receiving guidance.',
        fortune: { type: 'ji', score: 85 },
        conditions: {
          dreamDetails: { action: 'talking' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '神仙象征理想、精神追求、指引或内在智慧。',
    luckyNumbers: [1, 6, 9],
    keywords: ['神仙', '神', '菩萨', '佛', '仙人', '神明', '观音'],
  },

  // ==================== Objects & Buildings ====================
  {
    id: 'coffin',
    name: '棺材',
    pinyin: 'guancai',
    nameEn: 'Coffin',
    aliases: ['棺木', '寿材', '灵柩'],
    category: {
      primary: 'buildings',
      secondary: 'tombs',
      tags: ['反梦', '升官发财'],
    },
    interpretations: [
      {
        id: 'coffin_001',
        content: '梦见棺木，民吏迁官。',
        contentEn: 'Dreaming of a coffin indicates promotion for officials.',
        fortune: { type: 'ji', score: 80, aspects: { career: 88 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见棺木，民吏迁官',
          reliability: 'canonical',
        },
        weight: 0.95,
      },
      {
        id: 'coffin_002',
        content: '梦见棺材，主升官发财（棺=官，材=财）。',
        contentEn: 'Dreaming of a coffin indicates promotion and wealth (pun on Chinese words).',
        fortune: { type: 'da_ji', score: 88, aspects: { career: 90, wealth: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
      {
        id: 'coffin_003',
        content: '梦见空棺材，主有意外之喜。',
        contentEn: 'Dreaming of an empty coffin indicates unexpected joy.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dead_person', relationship: 'combined' },
    ],
    psychologicalAnalysis: '棺材在中国文化中因谐音常与升官发财相关，也象征结束与转化。',
    luckyNumbers: [4, 6, 8],
    keywords: ['棺材', '棺木', '寿材', '灵柩', '棺'],
  },
  {
    id: 'gold',
    name: '金子',
    pinyin: 'jinzi',
    nameEn: 'Gold',
    aliases: ['黄金', '金条', '金块', '金币'],
    category: {
      primary: 'objects',
      secondary: 'valuables',
      tags: ['财运', '大吉'],
    },
    interpretations: [
      {
        id: 'gold_001',
        content: '梦见金子，主大发财。',
        contentEn: 'Dreaming of gold indicates great wealth.',
        fortune: { type: 'da_ji', score: 90, aspects: { wealth: 95 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
      {
        id: 'gold_002',
        content: '梦见捡到金子，主有意外之财。',
        contentEn: 'Dreaming of finding gold indicates unexpected wealth.',
        fortune: { type: 'da_ji', score: 88, aspects: { wealth: 92 } },
        conditions: {
          dreamDetails: { action: 'finding' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'gold_003',
        content: '梦见丢失金子，主有破财之忧。',
        contentEn: 'Dreaming of losing gold indicates financial worries.',
        fortune: { type: 'xiong', score: 32, aspects: { wealth: 25 } },
        conditions: {
          dreamDetails: { action: 'losing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '金子象征价值、财富、成功和自我价值感。',
    luckyNumbers: [6, 8, 9],
    keywords: ['金子', '黄金', '金条', '金块', '金币', '金'],
  },
  {
    id: 'house',
    name: '房子',
    pinyin: 'fangzi',
    nameEn: 'House',
    aliases: ['房屋', '住宅', '新房', '老房子'],
    category: {
      primary: 'buildings',
      secondary: 'houses',
      tags: ['常见梦象', '家庭'],
    },
    interpretations: [
      {
        id: 'house_001',
        content: '梦见新房子，主有新开始。',
        contentEn: 'Dreaming of a new house indicates new beginnings.',
        fortune: { type: 'ji', score: 78, aspects: { family: 82 } },
        conditions: {
          dreamDetails: { state: 'new' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'house_002',
        content: '梦见房屋倒塌，主有大变故。',
        contentEn: 'Dreaming of a house collapsing indicates major upheaval.',
        fortune: { type: 'xiong', score: 28, aspects: { family: 22 } },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'house_003',
        content: '梦见打扫房子，主有喜事将至。',
        contentEn: 'Dreaming of cleaning a house indicates joyful events coming.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '房子象征自我、身体、心理状态或家庭生活。',
    luckyNumbers: [2, 4, 6],
    keywords: ['房子', '房屋', '住宅', '新房', '老房子', '家'],
  },
  {
    id: 'knife',
    name: '刀',
    pinyin: 'dao',
    nameEn: 'Knife',
    aliases: ['刀剑', '菜刀', '匕首', '剑'],
    category: {
      primary: 'objects',
      secondary: 'tools',
      tags: ['财运', '危险'],
    },
    interpretations: [
      {
        id: 'knife_001',
        content: '梦见刀剑，得钱财。',
        contentEn: 'Dreaming of knives or swords indicates gaining wealth.',
        fortune: { type: 'ji', score: 75, aspects: { wealth: 82 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见刀剑，得钱财',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'knife_002',
        content: '梦见被刀杀者，得长命。',
        contentEn: 'Dreaming of being killed by a knife indicates long life.',
        fortune: { type: 'ji', score: 78, aspects: { health: 85 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见被刀杀者，得长命',
          reliability: 'canonical',
        },
        weight: 0.88,
      },
      {
        id: 'knife_003',
        content: '梦见拿刀砍人，主有口舌之争。',
        contentEn: 'Dreaming of attacking with a knife indicates verbal disputes.',
        fortune: { type: 'xiong', score: 35 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '刀象征权力、决断、攻击性或分离。',
    luckyNumbers: [3, 7, 9],
    keywords: ['刀', '刀剑', '菜刀', '匕首', '剑', '刀砍'],
  },
  {
    id: 'car',
    name: '车',
    pinyin: 'che',
    nameEn: 'Car',
    aliases: ['汽车', '轿车', '开车', '坐车'],
    category: {
      primary: 'objects',
      secondary: 'vehicles',
      tags: ['出行', '事业'],
    },
    interpretations: [
      {
        id: 'car_001',
        content: '梦见开车，主事业顺利。',
        contentEn: 'Dreaming of driving indicates career success.',
        fortune: { type: 'ji', score: 75, aspects: { career: 80, travel: 78 } },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.7,
      },
      {
        id: 'car_002',
        content: '梦见车祸，主有危险之兆。',
        contentEn: 'Dreaming of a car accident indicates danger warnings.',
        fortune: { type: 'xiong', score: 30, aspects: { travel: 22, health: 35 } },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.75,
      },
      {
        id: 'car_003',
        content: '梦见坐车，主有贵人相助。',
        contentEn: 'Dreaming of riding in a car indicates help from benefactors.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.65,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '车象征人生方向、控制力和前进的动力。',
    luckyNumbers: [1, 4, 8],
    keywords: ['车', '汽车', '轿车', '开车', '坐车', '车祸'],
  },
  {
    id: 'clothes',
    name: '衣服',
    pinyin: 'yifu',
    nameEn: 'Clothes',
    aliases: ['衣裳', '新衣', '旧衣', '穿衣'],
    category: {
      primary: 'objects',
      secondary: 'clothing',
      tags: ['形象', '身份'],
    },
    interpretations: [
      {
        id: 'clothes_001',
        content: '梦见穿新衣，主有喜事。',
        contentEn: 'Dreaming of wearing new clothes indicates joyful events.',
        fortune: { type: 'ji', score: 78 },
        conditions: {
          dreamDetails: { state: 'new' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'clothes_002',
        content: '梦见衣服破烂，主有口舌是非。',
        contentEn: 'Dreaming of torn clothes indicates disputes.',
        fortune: { type: 'xiong', score: 38 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'clothes_003',
        content: '梦见脱衣，主有秘密泄露。',
        contentEn: 'Dreaming of undressing indicates secrets being revealed.',
        fortune: { type: 'zhong_ping', score: 45 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '衣服象征社会形象、身份认同和自我保护。',
    luckyNumbers: [2, 5, 8],
    keywords: ['衣服', '衣裳', '新衣', '旧衣', '穿衣', '脱衣'],
  },

  // ==================== Plants ====================
  {
    id: 'flower',
    name: '花',
    pinyin: 'hua',
    nameEn: 'Flower',
    aliases: ['鲜花', '花朵', '开花', '花落'],
    category: {
      primary: 'plants',
      secondary: 'flowers',
      tags: ['美好', '感情'],
    },
    interpretations: [
      {
        id: 'flower_001',
        content: '梦见鲜花盛开，主有喜事。',
        contentEn: 'Dreaming of blooming flowers indicates joyful events.',
        fortune: { type: 'ji', score: 80, aspects: { love: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'flower_002',
        content: '梦见花落，主有失意之事。',
        contentEn: 'Dreaming of falling flowers indicates disappointment.',
        fortune: { type: 'xiong', score: 40 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'flower_003',
        content: '梦见收到鲜花，主有人表达爱意。',
        contentEn: 'Dreaming of receiving flowers indicates someone expressing love.',
        fortune: { type: 'ji', score: 82, aspects: { love: 90 } },
        conditions: {
          dreamDetails: { action: 'receiving' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '花象征美好、爱情、生命的绽放，也可能代表短暂易逝之物。',
    luckyNumbers: [3, 6, 9],
    keywords: ['花', '鲜花', '花朵', '开花', '花落', '花开'],
  },
  {
    id: 'tree',
    name: '树',
    pinyin: 'shu',
    nameEn: 'Tree',
    aliases: ['大树', '树木', '枯树', '绿树'],
    category: {
      primary: 'plants',
      secondary: 'trees',
      tags: ['生命', '家族'],
    },
    interpretations: [
      {
        id: 'tree_001',
        content: '梦见绿树，主有生机和希望。',
        contentEn: 'Dreaming of green trees indicates vitality and hope.',
        fortune: { type: 'ji', score: 78, aspects: { health: 82 } },
        conditions: {
          dreamDetails: { color: 'green' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'tree_002',
        content: '梦见枯树，主有衰败之象。',
        contentEn: 'Dreaming of dead trees indicates decline.',
        fortune: { type: 'xiong', score: 35 },
        conditions: {
          dreamDetails: { state: 'dead' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'tree_003',
        content: '梦见爬树，主事业上进。',
        contentEn: 'Dreaming of climbing a tree indicates career advancement.',
        fortune: { type: 'ji', score: 75, aspects: { career: 80 } },
        conditions: {
          dreamDetails: { action: 'climbing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '树象征生命、成长、家族传承和根基稳固。',
    luckyNumbers: [3, 5, 8],
    keywords: ['树', '大树', '树木', '枯树', '绿树', '爬树'],
  },
  {
    id: 'fruit',
    name: '果实',
    pinyin: 'guoshi',
    nameEn: 'Fruit',
    aliases: ['水果', '苹果', '桃子', '果子'],
    category: {
      primary: 'plants',
      secondary: 'fruits',
      tags: ['收获', '成果'],
    },
    interpretations: [
      {
        id: 'fruit_001',
        content: '梦见成熟的果实，主有收获。',
        contentEn: 'Dreaming of ripe fruit indicates harvest and rewards.',
        fortune: { type: 'ji', score: 80, aspects: { wealth: 82, career: 78 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'fruit_002',
        content: '孕妇梦见果实，主生男孩。',
        contentEn: 'A pregnant woman dreaming of fruit indicates a baby boy.',
        fortune: { type: 'ji', score: 85, aspects: { family: 90 } },
        conditions: {
          dreamerIdentity: { specialStatus: 'pregnant' },
        },
        source: {
          bookName: '民间胎梦',
          reliability: 'folk',
        },
        weight: 0.75,
      },
      {
        id: 'fruit_003',
        content: '梦见烂果，主有损失。',
        contentEn: 'Dreaming of rotten fruit indicates losses.',
        fortune: { type: 'xiong', score: 35 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '果实象征成果、报酬、丰收和努力的结果。',
    luckyNumbers: [3, 6, 9],
    keywords: ['果实', '水果', '苹果', '桃子', '果子', '吃水果'],
  },

  // ==================== Life Events ====================
  {
    id: 'wedding',
    name: '结婚',
    pinyin: 'jiehun',
    nameEn: 'Wedding',
    aliases: ['婚礼', '嫁娶', '成婚', '办喜事'],
    category: {
      primary: 'life_events',
      secondary: 'marriage',
      tags: ['喜事', '感情'],
    },
    interpretations: [
      {
        id: 'wedding_001',
        content: '未婚者梦见结婚，主感情有进展。',
        contentEn: 'An unmarried person dreaming of wedding indicates relationship progress.',
        fortune: { type: 'ji', score: 80, aspects: { love: 88 } },
        conditions: {
          dreamerIdentity: { maritalStatus: 'unmarried' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'wedding_002',
        content: '已婚者梦见结婚，主有新的开始。',
        contentEn: 'A married person dreaming of wedding indicates new beginnings.',
        fortune: { type: 'zhong_ping', score: 55 },
        conditions: {
          dreamerIdentity: { maritalStatus: 'married' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'wedding_003',
        content: '梦见别人结婚，主有喜讯。',
        contentEn: 'Dreaming of others wedding indicates good news.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '婚礼象征承诺、结合、人生新阶段或对亲密关系的渴望。',
    luckyNumbers: [2, 6, 8],
    keywords: ['结婚', '婚礼', '嫁娶', '成婚', '办喜事', '婚姻'],
  },
  {
    id: 'pregnancy',
    name: '怀孕',
    pinyin: 'huaiyun',
    nameEn: 'Pregnancy',
    aliases: ['有孕', '怀胎', '有喜'],
    category: {
      primary: 'life_events',
      secondary: 'death',
      tags: ['新生', '创造'],
    },
    interpretations: [
      {
        id: 'pregnancy_001',
        content: '女性梦见怀孕，主有新计划或新希望。',
        contentEn: 'A woman dreaming of pregnancy indicates new plans or hope.',
        fortune: { type: 'ji', score: 78, aspects: { family: 82 } },
        conditions: {
          dreamerIdentity: { gender: 'female' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'pregnancy_002',
        content: '已婚未孕女性梦见怀孕，主有喜孕之兆。',
        contentEn: 'A married childless woman dreaming of pregnancy indicates conception.',
        fortune: { type: 'da_ji', score: 88, aspects: { family: 95 } },
        conditions: {
          dreamerIdentity: { gender: 'female', maritalStatus: 'married' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'pregnancy_003',
        content: '男性梦见妻子怀孕，主家庭有喜。',
        contentEn: 'A man dreaming of his wife being pregnant indicates family joy.',
        fortune: { type: 'ji', score: 80, aspects: { family: 88 } },
        conditions: {
          dreamerIdentity: { gender: 'male', maritalStatus: 'married' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [
      { symbolId: 'baby', relationship: 'sequential' },
    ],
    psychologicalAnalysis: '怀孕象征创造力、新想法的孕育、潜能的发展或对新生命的渴望。',
    luckyNumbers: [1, 3, 6],
    keywords: ['怀孕', '有孕', '怀胎', '有喜', '怀宝宝'],
  },
  // ==================== Additional Animals ====================
  {
    id: 'ox',
    name: '牛',
    pinyin: 'niu',
    nameEn: 'Ox/Cow',
    aliases: ['水牛', '黄牛', '奶牛', '牛群'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['勤劳', '财富'],
    },
    interpretations: [
      {
        id: 'ox_001',
        content: '梦见牛，主勤劳致富。',
        contentEn: 'Dreaming of an ox indicates wealth through hard work.',
        fortune: { type: 'ji', score: 78, aspects: { wealth: 82, career: 75 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'ox_002',
        content: '梦见骑牛，主事业稳步前进。',
        contentEn: 'Dreaming of riding an ox indicates steady career progress.',
        fortune: { type: 'ji', score: 75, aspects: { career: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'ox_003',
        content: '梦见牛耕田，主丰收。',
        contentEn: 'Dreaming of an ox plowing indicates good harvest.',
        fortune: { type: 'da_ji', score: 85, aspects: { wealth: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
    ],
    relatedSymbols: [
      { symbolId: 'horse', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：牛象征母性、滋养和性能量。荣格：牛代表力量、忍耐和大地母亲原型，象征稳定的生命力量。',
    luckyNumbers: [2, 6, 8],
    keywords: ['牛', '水牛', '黄牛', '奶牛', '牛群', '骑牛'],
  },
  {
    id: 'sheep',
    name: '羊',
    pinyin: 'yang',
    nameEn: 'Sheep/Goat',
    aliases: ['绵羊', '山羊', '小羊', '羊群'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['温顺', '吉祥'],
    },
    interpretations: [
      {
        id: 'sheep_001',
        content: '梦见羊，主吉祥如意。',
        contentEn: 'Dreaming of sheep indicates good fortune.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'sheep_002',
        content: '梦见羊群，主家庭和睦、财源广进。',
        contentEn: 'Dreaming of a flock of sheep indicates family harmony and wealth.',
        fortune: { type: 'da_ji', score: 85, aspects: { family: 88, wealth: 82 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'sheep_003',
        content: '梦见杀羊，主有喜事或祭祀。',
        contentEn: 'Dreaming of killing a sheep indicates celebrations or ceremonies.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：羊象征顺从和被动性。荣格：羊代表纯洁、牺牲和精神性，与替罪羊原型相关。',
    luckyNumbers: [3, 6, 8],
    keywords: ['羊', '绵羊', '山羊', '小羊', '羊群'],
  },
  {
    id: 'pig',
    name: '猪',
    pinyin: 'zhu',
    nameEn: 'Pig',
    aliases: ['野猪', '小猪', '肥猪', '母猪'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['财运', '福气'],
    },
    interpretations: [
      {
        id: 'pig_001',
        content: '梦见猪，主有横财。',
        contentEn: 'Dreaming of a pig indicates unexpected wealth.',
        fortune: { type: 'ji', score: 80, aspects: { wealth: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'pig_002',
        content: '梦见肥猪，主富贵发财。',
        contentEn: 'Dreaming of a fat pig indicates great wealth.',
        fortune: { type: 'da_ji', score: 88, aspects: { wealth: 92 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.88,
      },
      {
        id: 'pig_003',
        content: '孕妇梦见猪，主生贵子。',
        contentEn: 'A pregnant woman dreaming of a pig indicates giving birth to a noble child.',
        fortune: { type: 'da_ji', score: 90, aspects: { family: 95 } },
        conditions: {
          dreamerIdentity: { specialStatus: 'pregnant' },
        },
        source: {
          bookName: '民间胎梦',
          reliability: 'folk',
        },
        weight: 0.82,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：猪象征贪欲和物质享受。荣格：猪代表丰饶、富足，但也可能象征被压抑的本能欲望。',
    luckyNumbers: [6, 8, 9],
    keywords: ['猪', '野猪', '小猪', '肥猪', '母猪'],
  },
  {
    id: 'chicken',
    name: '鸡',
    pinyin: 'ji',
    nameEn: 'Chicken/Rooster',
    aliases: ['公鸡', '母鸡', '小鸡', '雄鸡'],
    category: {
      primary: 'animals',
      secondary: 'birds',
      tags: ['吉兆', '报晓'],
    },
    interpretations: [
      {
        id: 'chicken_001',
        content: '梦见公鸡报晓，主有喜讯。',
        contentEn: 'Dreaming of a rooster crowing indicates good news.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'chicken_002',
        content: '梦见母鸡下蛋，主有进财。',
        contentEn: 'Dreaming of a hen laying eggs indicates incoming wealth.',
        fortune: { type: 'ji', score: 82, aspects: { wealth: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'chicken_003',
        content: '梦见杀鸡，主有口舌是非。',
        contentEn: 'Dreaming of killing a chicken indicates disputes.',
        fortune: { type: 'xiong', score: 40 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'bird', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：公鸡象征男性气质和性能量。荣格：鸡象征警觉、新的开始，公鸡是太阳原型的象征。',
    luckyNumbers: [1, 5, 7],
    keywords: ['鸡', '公鸡', '母鸡', '小鸡', '雄鸡', '鸡叫'],
  },
  {
    id: 'turtle',
    name: '龟',
    pinyin: 'gui',
    nameEn: 'Turtle/Tortoise',
    aliases: ['乌龟', '海龟', '灵龟', '金龟'],
    category: {
      primary: 'animals',
      secondary: 'reptiles',
      tags: ['长寿', '大吉'],
    },
    interpretations: [
      {
        id: 'turtle_001',
        content: '梦见龟，主长寿健康。',
        contentEn: 'Dreaming of a turtle indicates longevity and health.',
        fortune: { type: 'da_ji', score: 88, aspects: { health: 95 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
      {
        id: 'turtle_002',
        content: '梦见龟爬入家中，主大富贵。',
        contentEn: 'Dreaming of a turtle entering your home indicates great fortune.',
        fortune: { type: 'da_ji', score: 92, aspects: { wealth: 90, health: 88 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.92,
      },
      {
        id: 'turtle_003',
        content: '商人梦见龟，主生意兴隆。',
        contentEn: 'A merchant dreaming of a turtle indicates prosperous business.',
        fortune: { type: 'da_ji', score: 88, aspects: { wealth: 92 } },
        conditions: {
          dreamerIdentity: { occupation: 'merchant' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dragon', relationship: 'similar', combinedMeaning: '龙龟同现，主极大富贵' },
    ],
    psychologicalAnalysis: '弗洛伊德：龟的壳象征防御机制和自我保护。荣格：龟代表智慧、长寿和宇宙秩序，是自性原型的象征。',
    luckyNumbers: [1, 6, 9],
    keywords: ['龟', '乌龟', '海龟', '灵龟', '金龟'],
  },
  {
    id: 'butterfly',
    name: '蝴蝶',
    pinyin: 'hudie',
    nameEn: 'Butterfly',
    aliases: ['蝶', '彩蝶', '粉蝶'],
    category: {
      primary: 'animals',
      secondary: 'insects',
      tags: ['变化', '爱情'],
    },
    interpretations: [
      {
        id: 'butterfly_001',
        content: '梦见蝴蝶，主有喜事或爱情运。',
        contentEn: 'Dreaming of a butterfly indicates joy or romance.',
        fortune: { type: 'ji', score: 78, aspects: { love: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'butterfly_002',
        content: '梦见蝴蝶飞舞，主心情愉悦、事业顺利。',
        contentEn: 'Dreaming of butterflies dancing indicates happiness and career success.',
        fortune: { type: 'ji', score: 80, aspects: { love: 82, career: 75 } },
        conditions: {
          dreamDetails: { action: 'flying' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'butterfly_003',
        content: '梦见捕捉蝴蝶，主追求爱情或美好事物。',
        contentEn: 'Dreaming of catching butterflies indicates pursuing love or beauty.',
        fortune: { type: 'zhong_ping', score: 60, aspects: { love: 65 } },
        conditions: {
          dreamDetails: { action: 'catching' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'flower', relationship: 'combined', combinedMeaning: '蝶恋花，主桃花运旺' },
    ],
    psychologicalAnalysis: '弗洛伊德：蝴蝶象征灵魂和变化，与性觉醒有关。荣格：蝴蝶代表转化、灵魂和心灵的变容，是个体化过程的象征。',
    luckyNumbers: [3, 6, 9],
    keywords: ['蝴蝶', '蝶', '彩蝶', '粉蝶', '蝶飞'],
  },
  {
    id: 'mouse',
    name: '老鼠',
    pinyin: 'laoshu',
    nameEn: 'Mouse/Rat',
    aliases: ['鼠', '耗子', '小老鼠'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['常见梦象', '小人'],
    },
    interpretations: [
      {
        id: 'mouse_001',
        content: '梦见老鼠，主有小人作祟。',
        contentEn: 'Dreaming of a mouse indicates scheming by petty people.',
        fortune: { type: 'xiong', score: 35 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'mouse_002',
        content: '梦见老鼠咬衣，主有口舌是非。',
        contentEn: 'Dreaming of a mouse gnawing clothes indicates disputes.',
        fortune: { type: 'xiong', score: 32 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'mouse_003',
        content: '梦见捉老鼠，主克服小人。',
        contentEn: 'Dreaming of catching a mouse indicates overcoming petty people.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'catching' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'cat', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '弗洛伊德：老鼠象征被压抑的恐惧和焦虑。荣格：老鼠代表阴影中的潜在威胁，需要被意识到并整合。',
    luckyNumbers: [1, 4, 7],
    keywords: ['老鼠', '鼠', '耗子', '小老鼠', '鼠咬'],
  },
  {
    id: 'rabbit',
    name: '兔子',
    pinyin: 'tuzi',
    nameEn: 'Rabbit',
    aliases: ['兔', '白兔', '野兔', '小兔'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['吉祥', '机敏'],
    },
    interpretations: [
      {
        id: 'rabbit_001',
        content: '梦见兔子，主吉祥如意。',
        contentEn: 'Dreaming of a rabbit indicates good fortune.',
        fortune: { type: 'ji', score: 75 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'rabbit_002',
        content: '梦见白兔，主有贵人相助。',
        contentEn: 'Dreaming of a white rabbit indicates help from benefactors.',
        fortune: { type: 'ji', score: 82 },
        conditions: {
          dreamDetails: { color: 'white' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'rabbit_003',
        content: '梦见捉兔子，主有意外之财。',
        contentEn: 'Dreaming of catching a rabbit indicates unexpected wealth.',
        fortune: { type: 'ji', score: 78, aspects: { wealth: 82 } },
        conditions: {
          dreamDetails: { action: 'catching' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：兔子象征生育力和性能量。荣格：兔子代表敏捷、直觉和月亮能量，与阿尼玛原型相关。',
    luckyNumbers: [3, 6, 8],
    keywords: ['兔子', '兔', '白兔', '野兔', '小兔'],
  },
  {
    id: 'fox',
    name: '狐狸',
    pinyin: 'huli',
    nameEn: 'Fox',
    aliases: ['狐', '白狐', '狐仙', '九尾狐'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['狡猾', '诱惑'],
    },
    interpretations: [
      {
        id: 'fox_001',
        content: '梦见狐狸，主有小人暗算或诱惑。',
        contentEn: 'Dreaming of a fox indicates scheming or temptation.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'fox_002',
        content: '男性梦见狐狸，主有桃花劫。',
        contentEn: 'A man dreaming of a fox indicates romantic troubles.',
        fortune: { type: 'xiong', score: 35, aspects: { love: 30 } },
        conditions: {
          dreamerIdentity: { gender: 'male' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'fox_003',
        content: '梦见打死狐狸，主战胜小人。',
        contentEn: 'Dreaming of killing a fox indicates defeating petty people.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：狐狸象征狡诈和性诱惑。荣格：狐狸代表阴影的狡猾面向，也象征智慧和变形能力。',
    luckyNumbers: [2, 5, 9],
    keywords: ['狐狸', '狐', '白狐', '狐仙', '九尾狐'],
  },
  {
    id: 'wolf',
    name: '狼',
    pinyin: 'lang',
    nameEn: 'Wolf',
    aliases: ['野狼', '灰狼', '饿狼'],
    category: {
      primary: 'animals',
      secondary: 'mammals',
      tags: ['危险', '野性'],
    },
    interpretations: [
      {
        id: 'wolf_001',
        content: '梦见狼，主有敌人或危险。',
        contentEn: 'Dreaming of a wolf indicates enemies or danger.',
        fortune: { type: 'xiong', score: 32 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'wolf_002',
        content: '梦见被狼追，主有小人迫害。',
        contentEn: 'Dreaming of being chased by a wolf indicates persecution.',
        fortune: { type: 'xiong', score: 28 },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'wolf_003',
        content: '梦见打死狼，主战胜敌人。',
        contentEn: 'Dreaming of killing a wolf indicates defeating enemies.',
        fortune: { type: 'ji', score: 75 },
        conditions: {
          dreamDetails: { action: 'killing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dog', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：狼象征被压抑的攻击性和性冲动。荣格：狼代表本能力量和野性自我，需要被整合而非压制。',
    luckyNumbers: [4, 7, 9],
    keywords: ['狼', '野狼', '灰狼', '饿狼', '狼群'],
  },
  {
    id: 'phoenix',
    name: '凤凰',
    pinyin: 'fenghuang',
    nameEn: 'Phoenix',
    aliases: ['凤', '火凤凰', '凤鸟'],
    category: {
      primary: 'animals',
      secondary: 'mythical',
      tags: ['大吉', '高贵'],
    },
    interpretations: [
      {
        id: 'phoenix_001',
        content: '梦见凤凰，主大富大贵。',
        contentEn: 'Dreaming of a phoenix indicates great wealth and nobility.',
        fortune: { type: 'da_ji', score: 95, aspects: { career: 95, wealth: 90 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.95,
      },
      {
        id: 'phoenix_002',
        content: '女性梦见凤凰，主婚姻美满或有贵子。',
        contentEn: 'A woman dreaming of a phoenix indicates happy marriage or noble child.',
        fortune: { type: 'da_ji', score: 92, aspects: { love: 95, family: 92 } },
        conditions: {
          dreamerIdentity: { gender: 'female' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
      {
        id: 'phoenix_003',
        content: '梦见凤凰飞舞，主有喜事将至。',
        contentEn: 'Dreaming of a dancing phoenix indicates upcoming joyful events.',
        fortune: { type: 'da_ji', score: 90 },
        conditions: {
          dreamDetails: { action: 'flying' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.88,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dragon', relationship: 'combined', combinedMeaning: '龙凤呈祥，大吉大利' },
    ],
    psychologicalAnalysis: '弗洛伊德：凤凰象征再生和性能量的转化。荣格：凤凰代表死亡与重生、心灵转化，是自性原型的象征。',
    luckyNumbers: [1, 6, 9],
    keywords: ['凤凰', '凤', '火凤凰', '凤鸟', '凤飞'],
  },
  {
    id: 'qilin',
    name: '麒麟',
    pinyin: 'qilin',
    nameEn: 'Qilin (Chinese Unicorn)',
    aliases: ['麟', '瑞兽', '祥兽'],
    category: {
      primary: 'animals',
      secondary: 'mythical',
      tags: ['大吉', '祥瑞', '胎梦'],
    },
    interpretations: [
      {
        id: 'qilin_001',
        content: '梦见麒麟，主大吉大利、子孙昌盛。',
        contentEn: 'Dreaming of a qilin indicates great fortune and prosperous descendants.',
        fortune: { type: 'da_ji', score: 98, aspects: { family: 98, wealth: 92 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.98,
      },
      {
        id: 'qilin_002',
        content: '孕妇梦见麒麟，主生麒麟儿（贵子）。',
        contentEn: 'A pregnant woman dreaming of a qilin indicates giving birth to a noble child.',
        fortune: { type: 'da_ji', score: 99, aspects: { family: 99 } },
        conditions: {
          dreamerIdentity: { specialStatus: 'pregnant' },
        },
        source: {
          bookName: '民间胎梦',
          reliability: 'traditional',
        },
        weight: 0.98,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dragon', relationship: 'similar' },
      { symbolId: 'phoenix', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：麒麟象征理想化的自我和完美追求。荣格：麒麟代表智慧、仁慈和神圣力量，是完整自性的象征。',
    luckyNumbers: [1, 5, 9],
    keywords: ['麒麟', '麟', '瑞兽', '祥兽', '麒麟送子'],
  },

  // ==================== Additional Body Parts ====================
  {
    id: 'eyes',
    name: '眼睛',
    pinyin: 'yanjing',
    nameEn: 'Eyes',
    aliases: ['眼', '眼珠', '双眼', '目'],
    category: {
      primary: 'body',
      secondary: 'organs',
      tags: ['洞察', '心灵'],
    },
    interpretations: [
      {
        id: 'eyes_001',
        content: '梦见眼睛明亮，主心明眼亮、事业顺利。',
        contentEn: 'Dreaming of bright eyes indicates clear vision and career success.',
        fortune: { type: 'ji', score: 78, aspects: { career: 82 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'eyes_002',
        content: '梦见眼睛失明，主有迷失方向或被蒙蔽。',
        contentEn: 'Dreaming of blindness indicates losing direction or being deceived.',
        fortune: { type: 'xiong', score: 30 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'eyes_003',
        content: '梦见眼中有异物，主有障碍或烦恼。',
        contentEn: 'Dreaming of something in the eye indicates obstacles or troubles.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：眼睛象征意识和觉察，也与阉割焦虑相关。荣格：眼睛代表洞察力和自我意识，是智慧的象征。',
    luckyNumbers: [2, 5, 8],
    keywords: ['眼睛', '眼', '眼珠', '双眼', '目', '眼睛明亮', '失明'],
  },
  {
    id: 'heart',
    name: '心脏',
    pinyin: 'xinzang',
    nameEn: 'Heart',
    aliases: ['心', '心跳', '心脏病'],
    category: {
      primary: 'body',
      secondary: 'organs',
      tags: ['情感', '核心'],
    },
    interpretations: [
      {
        id: 'heart_001',
        content: '梦见心脏跳动正常，主身体健康、情绪平稳。',
        contentEn: 'Dreaming of a normal heartbeat indicates good health and stable emotions.',
        fortune: { type: 'ji', score: 75, aspects: { health: 82 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'heart_002',
        content: '梦见心脏疼痛，主有忧心之事。',
        contentEn: 'Dreaming of heart pain indicates worrying matters.',
        fortune: { type: 'xiong', score: 35, aspects: { health: 38 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
      {
        id: 'heart_003',
        content: '梦见心跳加速，主有激动或恐惧之事。',
        contentEn: 'Dreaming of rapid heartbeat indicates excitement or fear.',
        fortune: { type: 'zhong_ping', score: 50 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.68,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：心脏象征情感核心和生命力。荣格：心脏代表情感中心、勇气和真实自我，是自性的象征。',
    luckyNumbers: [2, 6, 8],
    keywords: ['心脏', '心', '心跳', '心脏病', '心痛'],
  },

  // ==================== Additional Activities ====================
  {
    id: 'swimming',
    name: '游泳',
    pinyin: 'youyong',
    nameEn: 'Swimming',
    aliases: ['游水', '潜水', '在水里游'],
    category: {
      primary: 'activities',
      secondary: 'movement',
      tags: ['情绪', '探索'],
    },
    interpretations: [
      {
        id: 'swimming_001',
        content: '梦见游泳顺利，主事业顺利、心情愉快。',
        contentEn: 'Dreaming of swimming smoothly indicates career success and happiness.',
        fortune: { type: 'ji', score: 78, aspects: { career: 80, health: 75 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'swimming_002',
        content: '梦见在清水中游泳，主身心健康。',
        contentEn: 'Dreaming of swimming in clear water indicates physical and mental health.',
        fortune: { type: 'ji', score: 82, aspects: { health: 88 } },
        conditions: {
          dreamDetails: { state: 'bright' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'swimming_003',
        content: '梦见游泳溺水，主有困难或情绪困扰。',
        contentEn: 'Dreaming of drowning while swimming indicates difficulties or emotional troubles.',
        fortune: { type: 'xiong', score: 30, aspects: { health: 28 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：游泳象征在潜意识中探索，与胎儿记忆和性有关。荣格：游泳代表在集体无意识中航行，探索心灵深处。',
    luckyNumbers: [1, 6, 9],
    keywords: ['游泳', '游水', '潜水', '在水里游', '溺水'],
  },
  {
    id: 'fighting',
    name: '打架',
    pinyin: 'dajia',
    nameEn: 'Fighting',
    aliases: ['打人', '被打', '斗殴', '打斗'],
    category: {
      primary: 'activities',
      secondary: 'conflict',
      tags: ['冲突', '常见梦象'],
    },
    interpretations: [
      {
        id: 'fighting_001',
        content: '梦见打架，主内心有冲突或压力。',
        contentEn: 'Dreaming of fighting indicates inner conflict or pressure.',
        fortune: { type: 'zhong_ping', score: 45 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'fighting_002',
        content: '梦见打架胜利，主克服困难。',
        contentEn: 'Dreaming of winning a fight indicates overcoming difficulties.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
      {
        id: 'fighting_003',
        content: '梦见兄弟相打，主和合。',
        contentEn: 'Dreaming of siblings fighting indicates harmony (reverse dream).',
        fortune: { type: 'ji', score: 75, aspects: { family: 80 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见兄弟相打，和合',
          reliability: 'canonical',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：打架象征被压抑的攻击性和冲突。荣格：打架代表与阴影的对抗，是整合过程的一部分。',
    luckyNumbers: [3, 7, 9],
    keywords: ['打架', '打人', '被打', '斗殴', '打斗', '打仗'],
  },
  {
    id: 'crying',
    name: '哭泣',
    pinyin: 'kuqi',
    nameEn: 'Crying',
    aliases: ['哭', '流泪', '大哭', '痛哭'],
    category: {
      primary: 'activities',
      secondary: 'emotions',
      tags: ['情绪', '反梦'],
    },
    interpretations: [
      {
        id: 'crying_001',
        content: '梦见哭泣，主有喜事（反梦）。',
        contentEn: 'Dreaming of crying indicates joy coming (reverse dream).',
        fortune: { type: 'ji', score: 75 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'crying_002',
        content: '梦见大哭，主有意外之喜。',
        contentEn: 'Dreaming of crying loudly indicates unexpected joy.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'crying_003',
        content: '梦见哭后醒来心情沉重，主有忧愁之事。',
        contentEn: 'Dreaming of crying and waking up sad indicates worries.',
        fortune: { type: 'xiong', score: 40 },
        conditions: {
          dreamDetails: { emotion: 'sad' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：哭泣象征情绪释放和压抑情感的表达。荣格：哭泣代表心灵净化和情感整合的过程。',
    luckyNumbers: [2, 5, 8],
    keywords: ['哭泣', '哭', '流泪', '大哭', '痛哭', '哭了'],
  },
  {
    id: 'laughing',
    name: '笑',
    pinyin: 'xiao',
    nameEn: 'Laughing',
    aliases: ['大笑', '微笑', '笑容', '哈哈大笑'],
    category: {
      primary: 'activities',
      secondary: 'emotions',
      tags: ['情绪', '反梦'],
    },
    interpretations: [
      {
        id: 'laughing_001',
        content: '梦见大笑，可能主有忧愁（反梦）。',
        contentEn: 'Dreaming of laughing loudly may indicate worries (reverse dream).',
        fortune: { type: 'xiong', score: 42 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'laughing_002',
        content: '梦见微笑，主心情愉悦、人际和谐。',
        contentEn: 'Dreaming of smiling indicates happiness and social harmony.',
        fortune: { type: 'ji', score: 75, aspects: { love: 78 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
      {
        id: 'laughing_003',
        content: '梦见心气盛则善笑恐畏。',
        contentEn: 'Excess heart qi leads to dreams of laughing and fear.',
        fortune: { type: 'zhong_ping', score: 50, aspects: { health: 48 } },
        source: {
          bookName: '黄帝内经·灵枢',
          dynasty: '先秦',
          originalText: '心气盛，则梦善笑恐畏',
          reliability: 'canonical',
        },
        weight: 0.85,
      },
    ],
    relatedSymbols: [
      { symbolId: 'crying', relationship: 'opposite' },
    ],
    psychologicalAnalysis: '弗洛伊德：笑可能掩盖焦虑或防御机制。荣格：笑代表人格面具的表现，也可能是心灵愉悦的真实反映。',
    luckyNumbers: [3, 6, 9],
    keywords: ['笑', '大笑', '微笑', '笑容', '哈哈大笑', '笑了'],
  },
  {
    id: 'being_late',
    name: '迟到',
    pinyin: 'chidao',
    nameEn: 'Being Late',
    aliases: ['赶不上', '迟了', '来不及'],
    category: {
      primary: 'activities',
      secondary: 'work',
      tags: ['焦虑', '常见梦象'],
    },
    interpretations: [
      {
        id: 'late_001',
        content: '梦见迟到，主有焦虑或错失机会之感。',
        contentEn: 'Dreaming of being late indicates anxiety or fear of missing opportunities.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.75,
      },
      {
        id: 'late_002',
        content: '梦见上班迟到，主事业有压力。',
        contentEn: 'Dreaming of being late for work indicates career pressure.',
        fortune: { type: 'xiong', score: 40, aspects: { career: 35 } },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.72,
      },
      {
        id: 'late_003',
        content: '梦见最终赶上，主能克服困难。',
        contentEn: 'Dreaming of finally making it on time indicates overcoming difficulties.',
        fortune: { type: 'ji', score: 68 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.68,
      },
    ],
    relatedSymbols: [
      { symbolId: 'exam', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：迟到梦象征对义务的抗拒或回避。荣格：迟到代表与时间和生命节奏的冲突，反映对人生进程的焦虑。',
    luckyNumbers: [1, 4, 7],
    keywords: ['迟到', '赶不上', '迟了', '来不及', '迟到了'],
  },

  // ==================== Additional Objects ====================
  {
    id: 'sword',
    name: '剑',
    pinyin: 'jian',
    nameEn: 'Sword',
    aliases: ['宝剑', '长剑', '刀剑'],
    category: {
      primary: 'objects',
      secondary: 'weapons',
      tags: ['权力', '财运'],
    },
    interpretations: [
      {
        id: 'sword_001',
        content: '梦见剑，主有钱财或权力。',
        contentEn: 'Dreaming of a sword indicates wealth or power.',
        fortune: { type: 'ji', score: 78, aspects: { wealth: 82, career: 75 } },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见刀剑，得钱财',
          reliability: 'canonical',
        },
        weight: 0.88,
      },
      {
        id: 'sword_002',
        content: '梦见持剑，主有决断力。',
        contentEn: 'Dreaming of holding a sword indicates decisiveness.',
        fortune: { type: 'ji', score: 75, aspects: { career: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'sword_003',
        content: '梦见剑断，主有挫折。',
        contentEn: 'Dreaming of a broken sword indicates setbacks.',
        fortune: { type: 'xiong', score: 35 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'knife', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：剑是典型的阳具象征，代表男性气质和性能量。荣格：剑象征意志力、决断和分辨能力，是英雄原型的工具。',
    luckyNumbers: [3, 7, 9],
    keywords: ['剑', '宝剑', '长剑', '刀剑', '持剑'],
  },
  {
    id: 'money',
    name: '钱',
    pinyin: 'qian',
    nameEn: 'Money',
    aliases: ['钱财', '现金', '钞票', '金钱'],
    category: {
      primary: 'objects',
      secondary: 'valuables',
      tags: ['财运', '常见梦象'],
    },
    interpretations: [
      {
        id: 'money_001',
        content: '梦见捡钱，主有意外之财。',
        contentEn: 'Dreaming of finding money indicates unexpected wealth.',
        fortune: { type: 'ji', score: 82, aspects: { wealth: 88 } },
        conditions: {
          dreamDetails: { action: 'finding' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'money_002',
        content: '梦见丢钱，主有破财之忧。',
        contentEn: 'Dreaming of losing money indicates financial worries.',
        fortune: { type: 'xiong', score: 35, aspects: { wealth: 28 } },
        conditions: {
          dreamDetails: { action: 'losing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'money_003',
        content: '梦见数钱，主财运亨通。',
        contentEn: 'Dreaming of counting money indicates prosperous fortune.',
        fortune: { type: 'ji', score: 80, aspects: { wealth: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [
      { symbolId: 'gold', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：金钱象征能量、性能量或粪便（肛欲期关联）。荣格：金钱代表价值、自我价值感和心理能量的象征。',
    luckyNumbers: [6, 8, 9],
    keywords: ['钱', '钱财', '现金', '钞票', '金钱', '捡钱', '丢钱'],
  },
  {
    id: 'mirror',
    name: '镜子',
    pinyin: 'jingzi',
    nameEn: 'Mirror',
    aliases: ['镜', '铜镜', '照镜子'],
    category: {
      primary: 'objects',
      secondary: 'household',
      tags: ['自我', '反省'],
    },
    interpretations: [
      {
        id: 'mirror_001',
        content: '梦见照镜子，主自我反省或关注外表。',
        contentEn: 'Dreaming of looking in a mirror indicates self-reflection or appearance concern.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'mirror_002',
        content: '梦见镜子明亮，主心明眼亮。',
        contentEn: 'Dreaming of a bright mirror indicates clarity of mind.',
        fortune: { type: 'ji', score: 75 },
        conditions: {
          dreamDetails: { state: 'bright' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'mirror_003',
        content: '梦见镜子破碎，主有不祥之兆。',
        contentEn: 'Dreaming of a broken mirror indicates bad omens.',
        fortune: { type: 'xiong', score: 32 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：镜子象征自恋和自我形象。荣格：镜子代表自我意识和灵魂的反映，照见阴影和真实自我。',
    luckyNumbers: [2, 5, 8],
    keywords: ['镜子', '镜', '铜镜', '照镜子', '镜子破'],
  },
  {
    id: 'key',
    name: '钥匙',
    pinyin: 'yaoshi',
    nameEn: 'Key',
    aliases: ['锁匙', '开锁', '金钥匙'],
    category: {
      primary: 'objects',
      secondary: 'tools',
      tags: ['解决', '秘密'],
    },
    interpretations: [
      {
        id: 'key_001',
        content: '梦见钥匙，主能解决问题或有新机遇。',
        contentEn: 'Dreaming of a key indicates solving problems or new opportunities.',
        fortune: { type: 'ji', score: 78, aspects: { career: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'key_002',
        content: '梦见找到钥匙，主有转机。',
        contentEn: 'Dreaming of finding a key indicates a turning point.',
        fortune: { type: 'ji', score: 82 },
        conditions: {
          dreamDetails: { action: 'finding' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'key_003',
        content: '梦见丢失钥匙，主有困难或失去机会。',
        contentEn: 'Dreaming of losing a key indicates difficulties or missed opportunities.',
        fortune: { type: 'xiong', score: 38 },
        conditions: {
          dreamDetails: { action: 'losing' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：钥匙是明显的阳具象征，与性和进入有关。荣格：钥匙象征通往无意识的途径，是解开心灵奥秘的工具。',
    luckyNumbers: [1, 4, 7],
    keywords: ['钥匙', '锁匙', '开锁', '金钥匙', '钥匙丢了'],
  },
  {
    id: 'book',
    name: '书',
    pinyin: 'shu',
    nameEn: 'Book',
    aliases: ['书本', '书籍', '读书', '看书'],
    category: {
      primary: 'objects',
      secondary: 'stationery',
      tags: ['学业', '智慧'],
    },
    interpretations: [
      {
        id: 'book_001',
        content: '梦见读书，主学业进步或智慧增长。',
        contentEn: 'Dreaming of reading indicates academic progress or wisdom growth.',
        fortune: { type: 'ji', score: 78, aspects: { study: 85, career: 72 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'book_002',
        content: '学生梦见书，主考试顺利。',
        contentEn: 'A student dreaming of books indicates exam success.',
        fortune: { type: 'ji', score: 82, aspects: { study: 88 } },
        conditions: {
          dreamerIdentity: { occupation: 'student' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'book_003',
        content: '梦见书破损，主有学业挫折。',
        contentEn: 'Dreaming of damaged books indicates academic setbacks.',
        fortune: { type: 'xiong', score: 40, aspects: { study: 35 } },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'exam', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：书象征知识和权威，也可能代表女性身体。荣格：书代表集体智慧和自我发展的途径。',
    luckyNumbers: [1, 4, 6],
    keywords: ['书', '书本', '书籍', '读书', '看书'],
  },
  {
    id: 'boat',
    name: '船',
    pinyin: 'chuan',
    nameEn: 'Boat/Ship',
    aliases: ['轮船', '小船', '帆船', '坐船'],
    category: {
      primary: 'objects',
      secondary: 'vehicles',
      tags: ['人生旅途', '情绪'],
    },
    interpretations: [
      {
        id: 'boat_001',
        content: '梦见船在平静水面，主事业顺利。',
        contentEn: 'Dreaming of a boat on calm water indicates career success.',
        fortune: { type: 'ji', score: 78, aspects: { career: 82, travel: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'boat_002',
        content: '梦见船在风浪中，主有波折。',
        contentEn: 'Dreaming of a boat in rough waters indicates setbacks.',
        fortune: { type: 'xiong', score: 38 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'boat_003',
        content: '梦见船靠岸，主心愿达成。',
        contentEn: 'Dreaming of a boat reaching shore indicates wishes fulfilled.',
        fortune: { type: 'ji', score: 80 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
      {
        id: 'boat_004',
        content: '梦见船沉，主有大变故。',
        contentEn: 'Dreaming of a sinking ship indicates major upheaval.',
        fortune: { type: 'xiong', score: 25 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：船象征母体和安全的容器。荣格：船代表人生旅途和穿越无意识的工具，是个体化旅程的象征。',
    luckyNumbers: [2, 6, 8],
    keywords: ['船', '轮船', '小船', '帆船', '坐船', '船沉'],
  },

  // ==================== Additional Supernatural ====================
  {
    id: 'ancestor',
    name: '祖先',
    pinyin: 'zuxian',
    nameEn: 'Ancestor',
    aliases: ['先人', '祖宗', '已故亲人', '老祖宗'],
    category: {
      primary: 'supernatural',
      secondary: 'ancestors',
      tags: ['托梦', '指引'],
    },
    interpretations: [
      {
        id: 'ancestor_001',
        content: '梦见祖先，主有事相托或指引。',
        contentEn: 'Dreaming of ancestors indicates messages or guidance.',
        fortune: { type: 'zhong_ping', score: 55, aspects: { family: 65 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'ancestor_002',
        content: '梦见祖先微笑，主家宅平安。',
        contentEn: 'Dreaming of smiling ancestors indicates family peace.',
        fortune: { type: 'ji', score: 78, aspects: { family: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'ancestor_003',
        content: '梦见祖先不悦，主需祭祀或有事未了。',
        contentEn: 'Dreaming of displeased ancestors indicates need for offerings or unfinished matters.',
        fortune: { type: 'xiong', score: 40, aspects: { family: 35 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
    ],
    relatedSymbols: [
      { symbolId: 'dead_person', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：祖先梦反映与权威和家族的关系。荣格：祖先代表集体无意识中的智慧，是智慧老人原型的体现。',
    luckyNumbers: [1, 4, 9],
    keywords: ['祖先', '先人', '祖宗', '已故亲人', '老祖宗', '祖先托梦'],
  },
  {
    id: 'zombie',
    name: '僵尸',
    pinyin: 'jiangshi',
    nameEn: 'Zombie',
    aliases: ['活死人', '尸体', '行尸'],
    category: {
      primary: 'supernatural',
      secondary: 'ghosts',
      tags: ['恐惧', '压力'],
    },
    interpretations: [
      {
        id: 'zombie_001',
        content: '梦见僵尸，主有压力或恐惧。',
        contentEn: 'Dreaming of zombies indicates pressure or fear.',
        fortune: { type: 'xiong', score: 32 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.75,
      },
      {
        id: 'zombie_002',
        content: '梦见被僵尸追，主逃避问题。',
        contentEn: 'Dreaming of being chased by zombies indicates avoiding problems.',
        fortune: { type: 'xiong', score: 30 },
        conditions: {
          dreamDetails: { action: 'being_chased' },
        },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.72,
      },
      {
        id: 'zombie_003',
        content: '梦见战胜僵尸，主克服恐惧。',
        contentEn: 'Dreaming of defeating zombies indicates overcoming fears.',
        fortune: { type: 'ji', score: 72 },
        conditions: {
          dreamDetails: { action: 'fighting' },
        },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'ghost', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：僵尸象征被压抑的情感或创伤的回归。荣格：僵尸代表未被整合的阴影和心灵中"未死"的部分。',
    luckyNumbers: [4, 7],
    keywords: ['僵尸', '活死人', '尸体', '行尸', '僵尸追'],
  },
  {
    id: 'buddha',
    name: '菩萨',
    pinyin: 'pusa',
    nameEn: 'Bodhisattva/Buddha',
    aliases: ['佛', '观音', '如来', '佛像'],
    category: {
      primary: 'supernatural',
      secondary: 'deities',
      tags: ['大吉', '庇佑'],
    },
    interpretations: [
      {
        id: 'buddha_001',
        content: '梦见菩萨，主大吉大利、有贵人庇佑。',
        contentEn: 'Dreaming of Bodhisattva indicates great fortune and divine protection.',
        fortune: { type: 'da_ji', score: 92 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.92,
      },
      {
        id: 'buddha_002',
        content: '梦见拜佛，主心愿达成。',
        contentEn: 'Dreaming of worshipping Buddha indicates wishes fulfilled.',
        fortune: { type: 'ji', score: 85 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.85,
      },
      {
        id: 'buddha_003',
        content: '梦见佛光普照，主有大福报。',
        contentEn: 'Dreaming of Buddha light indicates great blessings.',
        fortune: { type: 'da_ji', score: 95 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.9,
      },
    ],
    relatedSymbols: [
      { symbolId: 'deity', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：佛菩萨象征理想化的父母形象。荣格：佛菩萨代表自性原型和心灵的更高层面，是个体化的目标。',
    luckyNumbers: [1, 6, 9],
    keywords: ['菩萨', '佛', '观音', '如来', '佛像', '拜佛'],
  },

  // ==================== Additional People ====================
  {
    id: 'parents',
    name: '父母',
    pinyin: 'fumu',
    nameEn: 'Parents',
    aliases: ['父亲', '母亲', '爸妈', '爹娘'],
    category: {
      primary: 'people',
      secondary: 'family',
      tags: ['常见梦象', '家庭'],
    },
    interpretations: [
      {
        id: 'parents_001',
        content: '梦见父母健在，主家庭和睦。',
        contentEn: 'Dreaming of living parents indicates family harmony.',
        fortune: { type: 'ji', score: 78, aspects: { family: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'parents_002',
        content: '梦见父母亡故，主大吉（反梦）。',
        contentEn: 'Dreaming of parents passing away indicates great fortune (reverse dream).',
        fortune: { type: 'da_ji', score: 85 },
        source: {
          bookName: '敦煌本梦书',
          dynasty: '唐',
          originalText: '梦见父母亡，大吉',
          reliability: 'canonical',
        },
        weight: 0.9,
      },
      {
        id: 'parents_003',
        content: '梦见与父母争吵，主有心结需解。',
        contentEn: 'Dreaming of arguing with parents indicates unresolved issues.',
        fortune: { type: 'zhong_ping', score: 45, aspects: { family: 40 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：父母代表超我和权威，与俄狄浦斯情结相关。荣格：父母代表内在父母原型，影响我们的人格发展。',
    luckyNumbers: [2, 6, 8],
    keywords: ['父母', '父亲', '母亲', '爸妈', '爹娘', '爸爸', '妈妈'],
  },
  {
    id: 'elderly',
    name: '老人',
    pinyin: 'laoren',
    nameEn: 'Elderly Person',
    aliases: ['老者', '老头', '老太', '长辈'],
    category: {
      primary: 'people',
      secondary: 'archetypes',
      tags: ['智慧', '指引'],
    },
    interpretations: [
      {
        id: 'elderly_001',
        content: '梦见老人，主有智者指引。',
        contentEn: 'Dreaming of an elderly person indicates guidance from the wise.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'elderly_002',
        content: '梦见慈祥的老人，主有贵人相助。',
        contentEn: 'Dreaming of a kind elderly person indicates help from benefactors.',
        fortune: { type: 'ji', score: 82 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'elderly_003',
        content: '梦见老人给东西，主有福报。',
        contentEn: 'Dreaming of an elderly person giving you something indicates blessings.',
        fortune: { type: 'ji', score: 80 },
        conditions: {
          dreamDetails: { action: 'receiving' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [
      { symbolId: 'deity', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：老人象征超我和道德权威。荣格：智慧老人是重要原型，代表引导和内在智慧。',
    luckyNumbers: [1, 6, 9],
    keywords: ['老人', '老者', '老头', '老太', '长辈', '老人家'],
  },

  // ==================== Additional Buildings ====================
  {
    id: 'bridge',
    name: '桥',
    pinyin: 'qiao',
    nameEn: 'Bridge',
    aliases: ['大桥', '木桥', '石桥', '过桥'],
    category: {
      primary: 'buildings',
      secondary: 'structures',
      tags: ['过渡', '连接'],
    },
    interpretations: [
      {
        id: 'bridge_001',
        content: '梦见过桥，主事情顺利过渡。',
        contentEn: 'Dreaming of crossing a bridge indicates smooth transitions.',
        fortune: { type: 'ji', score: 75, aspects: { career: 78 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'bridge_002',
        content: '梦见桥断，主有阻碍或危险。',
        contentEn: 'Dreaming of a broken bridge indicates obstacles or danger.',
        fortune: { type: 'xiong', score: 30 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'bridge_003',
        content: '梦见新桥，主有新的机遇。',
        contentEn: 'Dreaming of a new bridge indicates new opportunities.',
        fortune: { type: 'ji', score: 80 },
        conditions: {
          dreamDetails: { state: 'new' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
    ],
    relatedSymbols: [],
    psychologicalAnalysis: '弗洛伊德：桥象征过渡和连接，与性行为有关。荣格：桥代表连接意识和无意识的途径，是整合的象征。',
    luckyNumbers: [3, 6, 9],
    keywords: ['桥', '大桥', '木桥', '石桥', '过桥', '桥断'],
  },
  {
    id: 'tomb',
    name: '坟墓',
    pinyin: 'fenmu',
    nameEn: 'Tomb/Grave',
    aliases: ['坟', '墓地', '墓碑', '祖坟'],
    category: {
      primary: 'buildings',
      secondary: 'tombs',
      tags: ['反梦', '祖先'],
    },
    interpretations: [
      {
        id: 'tomb_001',
        content: '梦见坟墓，主有财运（反梦）。',
        contentEn: 'Dreaming of a tomb indicates wealth (reverse dream).',
        fortune: { type: 'ji', score: 75, aspects: { wealth: 80 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'tomb_002',
        content: '梦见扫墓，主家族运势好转。',
        contentEn: 'Dreaming of sweeping a tomb indicates improved family fortune.',
        fortune: { type: 'ji', score: 72, aspects: { family: 78 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'tomb_003',
        content: '梦见坟墓倒塌，主家族有变。',
        contentEn: 'Dreaming of a collapsing tomb indicates family changes.',
        fortune: { type: 'xiong', score: 35, aspects: { family: 30 } },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'coffin', relationship: 'similar' },
      { symbolId: 'dead_person', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：坟墓象征死亡焦虑和被压抑的记忆。荣格：坟墓代表心灵的转化之地，是死亡与重生的象征。',
    luckyNumbers: [4, 7, 9],
    keywords: ['坟墓', '坟', '墓地', '墓碑', '祖坟', '扫墓'],
  },
  {
    id: 'temple',
    name: '寺庙',
    pinyin: 'simiao',
    nameEn: 'Temple',
    aliases: ['庙', '佛寺', '道观', '庵堂'],
    category: {
      primary: 'buildings',
      secondary: 'religious',
      tags: ['灵性', '庇佑'],
    },
    interpretations: [
      {
        id: 'temple_001',
        content: '梦见寺庙，主心灵平静、有庇佑。',
        contentEn: 'Dreaming of a temple indicates spiritual peace and protection.',
        fortune: { type: 'ji', score: 78 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'temple_002',
        content: '梦见在寺庙拜佛，主心愿可成。',
        contentEn: 'Dreaming of worshipping in a temple indicates wishes will be fulfilled.',
        fortune: { type: 'ji', score: 82 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'temple_003',
        content: '梦见寺庙破败，主信仰动摇。',
        contentEn: 'Dreaming of a ruined temple indicates wavering faith.',
        fortune: { type: 'xiong', score: 40 },
        conditions: {
          dreamDetails: { state: 'broken' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'buddha', relationship: 'combined' },
      { symbolId: 'deity', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：寺庙象征神圣空间和超我。荣格：寺庙代表自性的圣殿，是与更高自我连接的地方。',
    luckyNumbers: [1, 6, 9],
    keywords: ['寺庙', '庙', '佛寺', '道观', '庵堂', '拜庙'],
  },
  {
    id: 'school',
    name: '学校',
    pinyin: 'xuexiao',
    nameEn: 'School',
    aliases: ['校园', '教室', '上学', '学堂'],
    category: {
      primary: 'buildings',
      secondary: 'education',
      tags: ['学习', '成长'],
    },
    interpretations: [
      {
        id: 'school_001',
        content: '梦见学校，主有学习机会或成长。',
        contentEn: 'Dreaming of a school indicates learning opportunities or growth.',
        fortune: { type: 'ji', score: 75, aspects: { study: 82, career: 70 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'school_002',
        content: '梦见回到学校，主有未完成的功课或人生课题。',
        contentEn: 'Dreaming of returning to school indicates unfinished lessons in life.',
        fortune: { type: 'zhong_ping', score: 55 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.72,
      },
      {
        id: 'school_003',
        content: '梦见在学校迷路，主方向迷失。',
        contentEn: 'Dreaming of being lost at school indicates losing direction.',
        fortune: { type: 'xiong', score: 40 },
        source: {
          bookName: '现代解梦',
          reliability: 'modern',
        },
        weight: 0.7,
      },
    ],
    relatedSymbols: [
      { symbolId: 'exam', relationship: 'combined' },
      { symbolId: 'book', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：学校象征权威和社会化过程。荣格：学校代表人生的学习之旅和个体化过程中的成长。',
    luckyNumbers: [1, 4, 6],
    keywords: ['学校', '校园', '教室', '上学', '学堂', '回学校'],
  },

  // ==================== Additional Nature ====================
  {
    id: 'river',
    name: '河',
    pinyin: 'he',
    nameEn: 'River',
    aliases: ['河流', '江河', '大河', '小河'],
    category: {
      primary: 'geography',
      secondary: 'water_bodies',
      tags: ['人生', '情绪'],
    },
    interpretations: [
      {
        id: 'river_001',
        content: '梦见河水清澈，主事业顺利。',
        contentEn: 'Dreaming of clear river water indicates career success.',
        fortune: { type: 'ji', score: 78, aspects: { career: 82 } },
        conditions: {
          dreamDetails: { state: 'bright' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'river_002',
        content: '梦见河水浑浊，主有烦恼。',
        contentEn: 'Dreaming of murky river water indicates troubles.',
        fortune: { type: 'xiong', score: 38 },
        conditions: {
          dreamDetails: { state: 'dark' },
        },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'river_003',
        content: '梦见过河，主渡过难关。',
        contentEn: 'Dreaming of crossing a river indicates overcoming difficulties.',
        fortune: { type: 'ji', score: 75 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.75,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'similar' },
      { symbolId: 'bridge', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：河流象征生命和时间的流逝，也与出生有关。荣格：河流代表生命之流和心灵能量的流动。',
    luckyNumbers: [1, 6, 9],
    keywords: ['河', '河流', '江河', '大河', '小河', '过河'],
  },
  {
    id: 'sea',
    name: '海',
    pinyin: 'hai',
    nameEn: 'Sea/Ocean',
    aliases: ['大海', '海洋', '海水', '海边'],
    category: {
      primary: 'geography',
      secondary: 'water_bodies',
      tags: ['潜意识', '广阔'],
    },
    interpretations: [
      {
        id: 'sea_001',
        content: '梦见大海平静，主心胸开阔、前途无量。',
        contentEn: 'Dreaming of a calm sea indicates open-mindedness and bright future.',
        fortune: { type: 'ji', score: 82, aspects: { career: 85 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'sea_002',
        content: '梦见海浪滔天，主有大变动。',
        contentEn: 'Dreaming of huge waves indicates major changes.',
        fortune: { type: 'zhong_ping', score: 48 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.78,
      },
      {
        id: 'sea_003',
        content: '梦见在海边，主有新的可能性。',
        contentEn: 'Dreaming of being by the sea indicates new possibilities.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'water', relationship: 'similar' },
      { symbolId: 'fish', relationship: 'combined' },
    ],
    psychologicalAnalysis: '弗洛伊德：大海象征母亲和潜意识的深渊。荣格：大海代表集体无意识的广阔领域，是心灵的源头。',
    luckyNumbers: [1, 6, 9],
    keywords: ['海', '大海', '海洋', '海水', '海边', '海浪'],
  },
  {
    id: 'snow',
    name: '雪',
    pinyin: 'xue',
    nameEn: 'Snow',
    aliases: ['下雪', '大雪', '白雪', '雪花'],
    category: {
      primary: 'celestial',
      secondary: 'weather',
      tags: ['纯洁', '财运'],
    },
    interpretations: [
      {
        id: 'snow_001',
        content: '梦见下雪，主有财运或好事将至。',
        contentEn: 'Dreaming of snow indicates wealth or good fortune coming.',
        fortune: { type: 'ji', score: 78, aspects: { wealth: 82 } },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.82,
      },
      {
        id: 'snow_002',
        content: '梦见白雪皑皑，主纯净、好运。',
        contentEn: 'Dreaming of white snow indicates purity and good luck.',
        fortune: { type: 'ji', score: 80 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.8,
      },
      {
        id: 'snow_003',
        content: '梦见雪融化，主困难消除。',
        contentEn: 'Dreaming of melting snow indicates difficulties resolving.',
        fortune: { type: 'ji', score: 72 },
        source: {
          bookName: '周公解梦',
          reliability: 'traditional',
        },
        weight: 0.72,
      },
    ],
    relatedSymbols: [
      { symbolId: 'rain', relationship: 'similar' },
    ],
    psychologicalAnalysis: '弗洛伊德：雪象征纯洁和情感的冻结。荣格：雪代表净化和精神的清明，是意识的提升。',
    luckyNumbers: [1, 6, 8],
    keywords: ['雪', '下雪', '大雪', '白雪', '雪花', '雪地'],
  },
];

// ==================== Symbol Map for Quick Lookup ====================

/**
 * Map of symbol ID to DreamSymbol for O(1) lookup
 */
export const DREAM_SYMBOLS: Map<string, DreamSymbol> = new Map(
  DREAM_SYMBOLS_DATA.map((symbol) => [symbol.id, symbol])
);

/**
 * Map of symbol name/alias to symbol ID for matching
 */
export const SYMBOL_NAME_INDEX: Map<string, string> = new Map();

// Build the name index
for (const symbol of DREAM_SYMBOLS_DATA) {
  // Index by primary name
  SYMBOL_NAME_INDEX.set(symbol.name, symbol.id);
  // Index by each alias
  for (const alias of symbol.aliases) {
    SYMBOL_NAME_INDEX.set(alias, symbol.id);
  }
  // Index by English name (lowercase)
  SYMBOL_NAME_INDEX.set(symbol.nameEn.toLowerCase(), symbol.id);
}

// ==================== Helper Functions ====================

/**
 * Get symbol by ID
 */
export function getSymbolById(id: string): DreamSymbol | undefined {
  return DREAM_SYMBOLS.get(id);
}

/**
 * Get symbol by name (Chinese or English)
 */
export function getSymbolByName(name: string): DreamSymbol | undefined {
  const normalizedName = name.toLowerCase().trim();
  const symbolId = SYMBOL_NAME_INDEX.get(normalizedName) || SYMBOL_NAME_INDEX.get(name);
  return symbolId ? DREAM_SYMBOLS.get(symbolId) : undefined;
}

/**
 * Search symbols by keyword
 */
export function searchSymbols(keyword: string): DreamSymbol[] {
  const normalizedKeyword = keyword.toLowerCase().trim();
  const results: DreamSymbol[] = [];

  for (const symbol of DREAM_SYMBOLS_DATA) {
    // Check name, aliases, and keywords
    if (
      symbol.name.includes(keyword) ||
      symbol.nameEn.toLowerCase().includes(normalizedKeyword) ||
      symbol.aliases.some((alias) => alias.includes(keyword)) ||
      symbol.keywords.some((kw) => kw.includes(keyword))
    ) {
      results.push(symbol);
    }
  }

  return results;
}

/**
 * Get symbols by category
 */
export function getSymbolsByCategory(categoryId: string): DreamSymbol[] {
  return DREAM_SYMBOLS_DATA.filter((symbol) => symbol.category.primary === categoryId);
}

/**
 * Get all symbol IDs
 */
export function getAllSymbolIds(): string[] {
  return DREAM_SYMBOLS_DATA.map((symbol) => symbol.id);
}

/**
 * Get symbol count
 */
export function getSymbolCount(): number {
  return DREAM_SYMBOLS_DATA.length;
}
