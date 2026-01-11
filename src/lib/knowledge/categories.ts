/**
 * Dream Interpretation Knowledge Base - Symbol Categories
 *
 * Defines the 13 primary categories for dream symbols based on:
 * - Traditional Chinese dream interpretation (Zhou Gong)
 * - Dunhuang dream manuscripts
 * - Menglin Xuanjie (Dream Forest Mystery)
 */

// ==================== Type Definitions ====================

/**
 * Dream symbol category definition
 */
export interface DreamCategory {
  /** Unique identifier */
  id: string;
  /** Chinese name */
  name: string;
  /** Pinyin romanization */
  pinyin: string;
  /** English translation */
  nameEn: string;
  /** Category description */
  description: string;
  /** Icon name (for UI) */
  icon: string;
  /** Theme color (hex) */
  color: string;
  /** Subcategories */
  subcategories: DreamSubcategory[];
  /** Display order */
  order: number;
}

/**
 * Subcategory within a main category
 */
export interface DreamSubcategory {
  /** Unique identifier */
  id: string;
  /** Chinese name */
  name: string;
  /** Pinyin romanization */
  pinyin: string;
  /** English translation */
  nameEn: string;
  /** Brief description */
  description: string;
}

// ==================== Category Data ====================

/**
 * The 13 primary dream symbol categories
 * Based on traditional Chinese classification systems
 */
export const DREAM_CATEGORIES: DreamCategory[] = [
  {
    id: 'celestial',
    name: '天象类',
    pinyin: 'tianxiang',
    nameEn: 'Celestial Phenomena',
    description: '日月星辰、风雨雷电、彩虹霜雾等天文气象类梦象',
    icon: 'Sun',
    color: '#f59e0b',
    order: 1,
    subcategories: [
      { id: 'sun_moon', name: '日月', pinyin: 'riyue', nameEn: 'Sun and Moon', description: '太阳、月亮相关' },
      { id: 'stars', name: '星辰', pinyin: 'xingchen', nameEn: 'Stars', description: '星星、流星、星座' },
      { id: 'weather', name: '风雨', pinyin: 'fengyu', nameEn: 'Weather', description: '风、雨、雷、电' },
      { id: 'sky', name: '天空', pinyin: 'tiankong', nameEn: 'Sky', description: '天空、云彩、彩虹' },
    ],
  },
  {
    id: 'geography',
    name: '地理类',
    pinyin: 'dili',
    nameEn: 'Geography & Landscapes',
    description: '山川河流、洞穴悬崖、田地池塘等地理环境类梦象',
    icon: 'Mountain',
    color: '#84cc16',
    order: 2,
    subcategories: [
      { id: 'mountains', name: '山岳', pinyin: 'shanyue', nameEn: 'Mountains', description: '山、峰、岭、崖' },
      { id: 'water_bodies', name: '水域', pinyin: 'shuiyu', nameEn: 'Water Bodies', description: '河、湖、海、池' },
      { id: 'land', name: '土地', pinyin: 'tudi', nameEn: 'Land', description: '田野、土地、洞穴' },
      { id: 'natural_disasters', name: '灾异', pinyin: 'zaiyi', nameEn: 'Natural Disasters', description: '地震、洪水、火山' },
    ],
  },
  {
    id: 'people',
    name: '人物类',
    pinyin: 'renwu',
    nameEn: 'People & Characters',
    description: '亲属、陌生人、古人圣贤、各种职业人物等',
    icon: 'Users',
    color: '#8b5cf6',
    order: 3,
    subcategories: [
      { id: 'family', name: '亲属', pinyin: 'qinshu', nameEn: 'Family', description: '父母、子女、兄弟姐妹' },
      { id: 'strangers', name: '陌生人', pinyin: 'moshengren', nameEn: 'Strangers', description: '陌生男女、异性' },
      { id: 'historical', name: '古人', pinyin: 'guren', nameEn: 'Historical Figures', description: '圣贤、名人、先人' },
      { id: 'occupations', name: '职业', pinyin: 'zhiye', nameEn: 'Occupations', description: '官员、医生、商人等' },
    ],
  },
  {
    id: 'body',
    name: '身体类',
    pinyin: 'shenti',
    nameEn: 'Body & Physical',
    description: '五官、四肢、内脏等身体部位相关的梦象',
    icon: 'User',
    color: '#ec4899',
    order: 4,
    subcategories: [
      { id: 'head_face', name: '头面', pinyin: 'toumian', nameEn: 'Head & Face', description: '头、脸、眼、耳、鼻、口' },
      { id: 'teeth_hair', name: '齿发', pinyin: 'chifa', nameEn: 'Teeth & Hair', description: '牙齿、头发' },
      { id: 'limbs', name: '四肢', pinyin: 'sizhi', nameEn: 'Limbs', description: '手、脚、手指' },
      { id: 'organs', name: '脏腑', pinyin: 'zangfu', nameEn: 'Internal Organs', description: '心、肝、血液' },
    ],
  },
  {
    id: 'animals',
    name: '动物类',
    pinyin: 'dongwu',
    nameEn: 'Animals',
    description: '走兽、飞禽、水族、虫类等动物梦象',
    icon: 'Bug',
    color: '#14b8a6',
    order: 5,
    subcategories: [
      { id: 'mythical', name: '神兽', pinyin: 'shenshou', nameEn: 'Mythical Creatures', description: '龙、凤凰、麒麟' },
      { id: 'mammals', name: '走兽', pinyin: 'zoushou', nameEn: 'Mammals', description: '虎、狼、马、牛、狗' },
      { id: 'birds', name: '飞禽', pinyin: 'feiqin', nameEn: 'Birds', description: '鹰、鸟、乌鸦、凤凰' },
      { id: 'reptiles', name: '蛇虫', pinyin: 'shechong', nameEn: 'Reptiles & Insects', description: '蛇、蜥蜴、虫子' },
      { id: 'aquatic', name: '水族', pinyin: 'shuizu', nameEn: 'Aquatic Animals', description: '鱼、虾、龟、蛙' },
    ],
  },
  {
    id: 'plants',
    name: '植物类',
    pinyin: 'zhiwu',
    nameEn: 'Plants & Vegetation',
    description: '花草、树木、果蔬等植物类梦象',
    icon: 'Flower',
    color: '#22c55e',
    order: 6,
    subcategories: [
      { id: 'flowers', name: '花卉', pinyin: 'huahui', nameEn: 'Flowers', description: '各种花朵' },
      { id: 'trees', name: '树木', pinyin: 'shumu', nameEn: 'Trees', description: '各类树木、竹子' },
      { id: 'fruits', name: '果实', pinyin: 'guoshi', nameEn: 'Fruits', description: '水果、种子' },
      { id: 'crops', name: '庄稼', pinyin: 'zhuangjia', nameEn: 'Crops', description: '稻麦、蔬菜' },
    ],
  },
  {
    id: 'objects',
    name: '器物类',
    pinyin: 'qiwu',
    nameEn: 'Objects & Items',
    description: '服饰、器具、交通工具、钱财珠宝等物品',
    icon: 'Package',
    color: '#f97316',
    order: 7,
    subcategories: [
      { id: 'clothing', name: '服饰', pinyin: 'fushi', nameEn: 'Clothing', description: '衣服、鞋帽、首饰' },
      { id: 'tools', name: '器具', pinyin: 'qiju', nameEn: 'Tools & Utensils', description: '刀剑、碗筷' },
      { id: 'vehicles', name: '车船', pinyin: 'chechuan', nameEn: 'Vehicles', description: '车、船、飞机' },
      { id: 'valuables', name: '财宝', pinyin: 'caibao', nameEn: 'Valuables', description: '金银、珠宝、钱币' },
    ],
  },
  {
    id: 'buildings',
    name: '建筑类',
    pinyin: 'jianzhu',
    nameEn: 'Buildings & Structures',
    description: '房屋、宫殿庙宇、桥梁道路等建筑设施',
    icon: 'Building',
    color: '#64748b',
    order: 8,
    subcategories: [
      { id: 'houses', name: '房屋', pinyin: 'fangwu', nameEn: 'Houses', description: '住宅、房间、门窗' },
      { id: 'temples', name: '庙宇', pinyin: 'miaoyu', nameEn: 'Temples', description: '寺庙、宫殿、教堂' },
      { id: 'bridges_roads', name: '桥路', pinyin: 'qiaolu', nameEn: 'Bridges & Roads', description: '桥、路、阶梯' },
      { id: 'tombs', name: '坟墓', pinyin: 'fenmu', nameEn: 'Tombs', description: '墓地、棺材' },
    ],
  },
  {
    id: 'supernatural',
    name: '鬼神类',
    pinyin: 'guishen',
    nameEn: 'Supernatural & Spiritual',
    description: '神仙佛道、鬼怪妖魔、祖先亡灵等超自然存在',
    icon: 'Ghost',
    color: '#a855f7',
    order: 9,
    subcategories: [
      { id: 'deities', name: '神仙', pinyin: 'shenxian', nameEn: 'Deities', description: '神仙、佛菩萨、天使' },
      { id: 'ghosts', name: '鬼魂', pinyin: 'guihun', nameEn: 'Ghosts', description: '鬼、幽灵、亡魂' },
      { id: 'demons', name: '妖魔', pinyin: 'yaomo', nameEn: 'Demons', description: '妖怪、恶魔' },
      { id: 'ancestors', name: '祖先', pinyin: 'zuxian', nameEn: 'Ancestors', description: '已故亲人托梦' },
    ],
  },
  {
    id: 'activities',
    name: '活动类',
    pinyin: 'huodong',
    nameEn: 'Activities & Actions',
    description: '吃喝、行走、工作、社交等行为动作',
    icon: 'Activity',
    color: '#06b6d4',
    order: 10,
    subcategories: [
      { id: 'movement', name: '移动', pinyin: 'yidong', nameEn: 'Movement', description: '飞翔、坠落、追逐、逃跑' },
      { id: 'eating', name: '饮食', pinyin: 'yinshi', nameEn: 'Eating & Drinking', description: '吃、喝、烹饪' },
      { id: 'work', name: '工作', pinyin: 'gongzuo', nameEn: 'Work', description: '劳动、会议、考试' },
      { id: 'social', name: '社交', pinyin: 'shejiao', nameEn: 'Social', description: '聚会、争吵、结婚' },
    ],
  },
  {
    id: 'emotions',
    name: '情感类',
    pinyin: 'qinggan',
    nameEn: 'Emotions & Feelings',
    description: '喜悦、恐惧、愤怒、悲伤等情绪情感',
    icon: 'Heart',
    color: '#ef4444',
    order: 11,
    subcategories: [
      { id: 'positive', name: '正面', pinyin: 'zhengmian', nameEn: 'Positive', description: '喜悦、兴奋、满足' },
      { id: 'negative', name: '负面', pinyin: 'fumian', nameEn: 'Negative', description: '恐惧、愤怒、悲伤' },
      { id: 'complex', name: '复杂', pinyin: 'fuza', nameEn: 'Complex', description: '迷茫、焦虑、无奈' },
    ],
  },
  {
    id: 'life_events',
    name: '生活类',
    pinyin: 'shenghuo',
    nameEn: 'Life Events',
    description: '婚丧嫁娶、疾病健康、考试升迁等生活事件',
    icon: 'Calendar',
    color: '#3b82f6',
    order: 12,
    subcategories: [
      { id: 'marriage', name: '婚姻', pinyin: 'hunyin', nameEn: 'Marriage', description: '结婚、离婚、恋爱' },
      { id: 'death', name: '生死', pinyin: 'shengsi', nameEn: 'Birth & Death', description: '生育、死亡、葬礼' },
      { id: 'health', name: '健康', pinyin: 'jiankang', nameEn: 'Health', description: '疾病、受伤、康复' },
      { id: 'career', name: '事业', pinyin: 'shiye', nameEn: 'Career', description: '升迁、考试、失业' },
    ],
  },
  {
    id: 'special',
    name: '特殊类',
    pinyin: 'teshu',
    nameEn: 'Special Categories',
    description: '孕妇胎梦、儿童专属梦境等特殊人群梦象',
    icon: 'Star',
    color: '#eab308',
    order: 13,
    subcategories: [
      { id: 'pregnancy', name: '胎梦', pinyin: 'taimeng', nameEn: 'Pregnancy Dreams', description: '孕妇专属梦境' },
      { id: 'children', name: '童梦', pinyin: 'tongmeng', nameEn: 'Children Dreams', description: '儿童专属梦境' },
      { id: 'recurring', name: '重复', pinyin: 'chongfu', nameEn: 'Recurring Dreams', description: '反复出现的梦' },
      { id: 'lucid', name: '清明', pinyin: 'qingming', nameEn: 'Lucid Dreams', description: '清醒梦' },
    ],
  },
];

// ==================== Helper Functions ====================

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): DreamCategory | undefined {
  return DREAM_CATEGORIES.find((cat) => cat.id === categoryId);
}

/**
 * Get category by Chinese name
 */
export function getCategoryByName(name: string): DreamCategory | undefined {
  return DREAM_CATEGORIES.find((cat) => cat.name === name);
}

/**
 * Get all subcategories for a category
 */
export function getSubcategories(categoryId: string): DreamSubcategory[] {
  const category = getCategoryById(categoryId);
  return category?.subcategories ?? [];
}

/**
 * Find category and subcategory by subcategory ID
 */
export function findCategoryBySubcategoryId(
  subcategoryId: string
): { category: DreamCategory; subcategory: DreamSubcategory } | undefined {
  for (const category of DREAM_CATEGORIES) {
    const subcategory = category.subcategories.find((sub) => sub.id === subcategoryId);
    if (subcategory) {
      return { category, subcategory };
    }
  }
  return undefined;
}

/**
 * Get sorted categories by display order
 */
export function getSortedCategories(): DreamCategory[] {
  return [...DREAM_CATEGORIES].sort((a, b) => a.order - b.order);
}

/**
 * Category ID to name mapping for quick lookup
 */
export const CATEGORY_ID_TO_NAME: Record<string, string> = Object.fromEntries(
  DREAM_CATEGORIES.map((cat) => [cat.id, cat.name])
);

/**
 * Category name to ID mapping for quick lookup
 */
export const CATEGORY_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  DREAM_CATEGORIES.map((cat) => [cat.name, cat.id])
);
