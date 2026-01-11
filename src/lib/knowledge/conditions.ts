/**
 * Dream Interpretation Knowledge Base - Interpretation Conditions
 *
 * Defines the conditions that affect dream interpretation based on:
 * - Dreamer identity (gender, status, occupation)
 * - Context factors (time, season, actions)
 * - Traditional Chinese dream interpretation rules
 */

// ==================== Type Definitions ====================

/**
 * Dreamer gender options
 */
export type DreamerGender = 'male' | 'female' | 'any';

/**
 * Dreamer marital status options
 */
export type DreamerMaritalStatus = 'unmarried' | 'married' | 'widowed' | 'divorced' | 'any';

/**
 * Dreamer occupation categories
 */
export type DreamerOccupation =
  | 'merchant'      // 商人
  | 'official'      // 官员
  | 'farmer'        // 农民
  | 'student'       // 学生
  | 'soldier'       // 士兵
  | 'monk'          // 僧侣
  | 'doctor'        // 医生
  | 'teacher'       // 教师
  | 'artist'        // 艺术家
  | 'worker'        // 工人
  | 'entrepreneur'  // 企业家
  | 'any';          // 任何职业

/**
 * Special dreamer status
 */
export type DreamerSpecialStatus =
  | 'pregnant'      // 孕妇
  | 'sick'          // 病人
  | 'elderly'       // 老人
  | 'child'         // 儿童
  | 'newlywed'      // 新婚
  | 'grieving'      // 丧亲
  | 'traveling'     // 出行中
  | 'none';         // 无特殊状态

/**
 * Traditional Chinese time periods (Shichen)
 */
export type TimeOfDay =
  | 'zi'    // 子时 23:00-01:00
  | 'chou'  // 丑时 01:00-03:00
  | 'yin'   // 寅时 03:00-05:00
  | 'mao'   // 卯时 05:00-07:00
  | 'chen'  // 辰时 07:00-09:00
  | 'si'    // 巳时 09:00-11:00
  | 'wu'    // 午时 11:00-13:00
  | 'wei'   // 未时 13:00-15:00
  | 'shen'  // 申时 15:00-17:00
  | 'you'   // 酉时 17:00-19:00
  | 'xu'    // 戌时 19:00-21:00
  | 'hai'   // 亥时 21:00-23:00
  | 'any';

/**
 * Seasons
 */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'any';

/**
 * Dream action verbs
 */
export type DreamAction =
  | 'seeing'        // 看见
  | 'being_chased'  // 被追
  | 'killing'       // 杀死
  | 'eating'        // 吃
  | 'catching'      // 抓住
  | 'escaping'      // 逃跑
  | 'flying'        // 飞翔
  | 'falling'       // 坠落
  | 'swimming'      // 游泳
  | 'climbing'      // 攀爬
  | 'fighting'      // 打架
  | 'talking'       // 交谈
  | 'receiving'     // 接收
  | 'giving'        // 给予
  | 'losing'        // 丢失
  | 'finding'       // 找到
  | 'transforming'  // 变化
  | 'any';

/**
 * Colors in dreams
 */
export type DreamColor =
  | 'white'   // 白色
  | 'black'   // 黑色
  | 'red'     // 红色
  | 'yellow'  // 黄色
  | 'blue'    // 青/蓝色
  | 'green'   // 绿色
  | 'gold'    // 金色
  | 'silver'  // 银色
  | 'purple'  // 紫色
  | 'any';

/**
 * States of objects/beings in dreams
 */
export type DreamState =
  | 'alive'     // 活的
  | 'dead'      // 死的
  | 'injured'   // 受伤的
  | 'giant'     // 巨大的
  | 'tiny'      // 微小的
  | 'beautiful' // 美丽的
  | 'ugly'      // 丑陋的
  | 'old'       // 老旧的
  | 'new'       // 新的
  | 'broken'    // 破损的
  | 'bright'    // 明亮的
  | 'dark'      // 黑暗的
  | 'any';

/**
 * Complete dreamer identity conditions
 */
export interface DreamerIdentity {
  gender?: DreamerGender;
  maritalStatus?: DreamerMaritalStatus;
  occupation?: DreamerOccupation;
  specialStatus?: DreamerSpecialStatus;
  ageRange?: {
    min?: number;
    max?: number;
  };
}

/**
 * Time-related context conditions
 */
export interface TimeContext {
  timeOfDay?: TimeOfDay;
  season?: Season;
  lunarPhase?: 'new_moon' | 'waxing' | 'full_moon' | 'waning' | 'any';
}

/**
 * Dream detail conditions
 */
export interface DreamDetails {
  action?: DreamAction;
  color?: DreamColor;
  state?: DreamState;
  quantity?: 'single' | 'pair' | 'multiple' | 'any';
  direction?: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward' | 'any';
  emotion?: 'happy' | 'scared' | 'angry' | 'sad' | 'confused' | 'calm' | 'any';
}

/**
 * Complete interpretation condition set
 */
export interface InterpretationCondition {
  dreamerIdentity?: DreamerIdentity;
  timeContext?: TimeContext;
  dreamDetails?: DreamDetails;
  /** Custom condition description */
  customCondition?: string;
}

// ==================== Condition Definitions ====================

/**
 * Dreamer gender options with Chinese labels
 */
export const GENDER_OPTIONS: Array<{ value: DreamerGender; label: string; labelEn: string }> = [
  { value: 'male', label: '男', labelEn: 'Male' },
  { value: 'female', label: '女', labelEn: 'Female' },
  { value: 'any', label: '不限', labelEn: 'Any' },
];

/**
 * Marital status options with Chinese labels
 */
export const MARITAL_STATUS_OPTIONS: Array<{ value: DreamerMaritalStatus; label: string; labelEn: string }> = [
  { value: 'unmarried', label: '未婚', labelEn: 'Unmarried' },
  { value: 'married', label: '已婚', labelEn: 'Married' },
  { value: 'widowed', label: '丧偶', labelEn: 'Widowed' },
  { value: 'divorced', label: '离异', labelEn: 'Divorced' },
  { value: 'any', label: '不限', labelEn: 'Any' },
];

/**
 * Occupation options with Chinese labels
 */
export const OCCUPATION_OPTIONS: Array<{ value: DreamerOccupation; label: string; labelEn: string }> = [
  { value: 'merchant', label: '商人', labelEn: 'Merchant' },
  { value: 'official', label: '官员', labelEn: 'Official' },
  { value: 'farmer', label: '农民', labelEn: 'Farmer' },
  { value: 'student', label: '学生', labelEn: 'Student' },
  { value: 'soldier', label: '士兵', labelEn: 'Soldier' },
  { value: 'monk', label: '僧侣', labelEn: 'Monk' },
  { value: 'doctor', label: '医生', labelEn: 'Doctor' },
  { value: 'teacher', label: '教师', labelEn: 'Teacher' },
  { value: 'artist', label: '艺术家', labelEn: 'Artist' },
  { value: 'worker', label: '工人', labelEn: 'Worker' },
  { value: 'entrepreneur', label: '企业家', labelEn: 'Entrepreneur' },
  { value: 'any', label: '不限', labelEn: 'Any' },
];

/**
 * Special status options with Chinese labels
 */
export const SPECIAL_STATUS_OPTIONS: Array<{ value: DreamerSpecialStatus; label: string; labelEn: string }> = [
  { value: 'pregnant', label: '孕妇', labelEn: 'Pregnant' },
  { value: 'sick', label: '病人', labelEn: 'Sick' },
  { value: 'elderly', label: '老人', labelEn: 'Elderly' },
  { value: 'child', label: '儿童', labelEn: 'Child' },
  { value: 'newlywed', label: '新婚', labelEn: 'Newlywed' },
  { value: 'grieving', label: '丧亲', labelEn: 'Grieving' },
  { value: 'traveling', label: '出行中', labelEn: 'Traveling' },
  { value: 'none', label: '无', labelEn: 'None' },
];

/**
 * Traditional Chinese time periods (Shichen) with details
 */
export const TIME_OF_DAY_OPTIONS: Array<{
  value: TimeOfDay;
  label: string;
  labelEn: string;
  hourRange: string;
  element: string;
}> = [
  { value: 'zi', label: '子时', labelEn: 'Zi Hour', hourRange: '23:00-01:00', element: '水' },
  { value: 'chou', label: '丑时', labelEn: 'Chou Hour', hourRange: '01:00-03:00', element: '土' },
  { value: 'yin', label: '寅时', labelEn: 'Yin Hour', hourRange: '03:00-05:00', element: '木' },
  { value: 'mao', label: '卯时', labelEn: 'Mao Hour', hourRange: '05:00-07:00', element: '木' },
  { value: 'chen', label: '辰时', labelEn: 'Chen Hour', hourRange: '07:00-09:00', element: '土' },
  { value: 'si', label: '巳时', labelEn: 'Si Hour', hourRange: '09:00-11:00', element: '火' },
  { value: 'wu', label: '午时', labelEn: 'Wu Hour', hourRange: '11:00-13:00', element: '火' },
  { value: 'wei', label: '未时', labelEn: 'Wei Hour', hourRange: '13:00-15:00', element: '土' },
  { value: 'shen', label: '申时', labelEn: 'Shen Hour', hourRange: '15:00-17:00', element: '金' },
  { value: 'you', label: '酉时', labelEn: 'You Hour', hourRange: '17:00-19:00', element: '金' },
  { value: 'xu', label: '戌时', labelEn: 'Xu Hour', hourRange: '19:00-21:00', element: '土' },
  { value: 'hai', label: '亥时', labelEn: 'Hai Hour', hourRange: '21:00-23:00', element: '水' },
  { value: 'any', label: '不限', labelEn: 'Any', hourRange: '', element: '' },
];

/**
 * Season options with Chinese labels
 */
export const SEASON_OPTIONS: Array<{ value: Season; label: string; labelEn: string; months: string }> = [
  { value: 'spring', label: '春', labelEn: 'Spring', months: '2-4月' },
  { value: 'summer', label: '夏', labelEn: 'Summer', months: '5-7月' },
  { value: 'autumn', label: '秋', labelEn: 'Autumn', months: '8-10月' },
  { value: 'winter', label: '冬', labelEn: 'Winter', months: '11-1月' },
  { value: 'any', label: '不限', labelEn: 'Any', months: '' },
];

/**
 * Dream action options with Chinese labels
 */
export const ACTION_OPTIONS: Array<{ value: DreamAction; label: string; labelEn: string }> = [
  { value: 'seeing', label: '看见', labelEn: 'Seeing' },
  { value: 'being_chased', label: '被追', labelEn: 'Being Chased' },
  { value: 'killing', label: '杀死', labelEn: 'Killing' },
  { value: 'eating', label: '吃', labelEn: 'Eating' },
  { value: 'catching', label: '抓住', labelEn: 'Catching' },
  { value: 'escaping', label: '逃跑', labelEn: 'Escaping' },
  { value: 'flying', label: '飞翔', labelEn: 'Flying' },
  { value: 'falling', label: '坠落', labelEn: 'Falling' },
  { value: 'swimming', label: '游泳', labelEn: 'Swimming' },
  { value: 'climbing', label: '攀爬', labelEn: 'Climbing' },
  { value: 'fighting', label: '打架', labelEn: 'Fighting' },
  { value: 'talking', label: '交谈', labelEn: 'Talking' },
  { value: 'receiving', label: '接收', labelEn: 'Receiving' },
  { value: 'giving', label: '给予', labelEn: 'Giving' },
  { value: 'losing', label: '丢失', labelEn: 'Losing' },
  { value: 'finding', label: '找到', labelEn: 'Finding' },
  { value: 'transforming', label: '变化', labelEn: 'Transforming' },
  { value: 'any', label: '不限', labelEn: 'Any' },
];

/**
 * Color options with Chinese labels and symbolism
 */
export const COLOR_OPTIONS: Array<{
  value: DreamColor;
  label: string;
  labelEn: string;
  symbolism: string;
}> = [
  { value: 'white', label: '白色', labelEn: 'White', symbolism: '纯洁、丧葬、西方' },
  { value: 'black', label: '黑色', labelEn: 'Black', symbolism: '神秘、北方、恐惧' },
  { value: 'red', label: '红色', labelEn: 'Red', symbolism: '喜庆、南方、热情' },
  { value: 'yellow', label: '黄色', labelEn: 'Yellow', symbolism: '皇权、中央、尊贵' },
  { value: 'blue', label: '青色', labelEn: 'Blue/Cyan', symbolism: '东方、生机、宁静' },
  { value: 'green', label: '绿色', labelEn: 'Green', symbolism: '生命、希望、成长' },
  { value: 'gold', label: '金色', labelEn: 'Gold', symbolism: '财富、尊贵、圆满' },
  { value: 'silver', label: '银色', labelEn: 'Silver', symbolism: '纯净、月亮、智慧' },
  { value: 'purple', label: '紫色', labelEn: 'Purple', symbolism: '高贵、神秘、灵性' },
  { value: 'any', label: '不限', labelEn: 'Any', symbolism: '' },
];

/**
 * State options with Chinese labels
 */
export const STATE_OPTIONS: Array<{ value: DreamState; label: string; labelEn: string }> = [
  { value: 'alive', label: '活的', labelEn: 'Alive' },
  { value: 'dead', label: '死的', labelEn: 'Dead' },
  { value: 'injured', label: '受伤的', labelEn: 'Injured' },
  { value: 'giant', label: '巨大的', labelEn: 'Giant' },
  { value: 'tiny', label: '微小的', labelEn: 'Tiny' },
  { value: 'beautiful', label: '美丽的', labelEn: 'Beautiful' },
  { value: 'ugly', label: '丑陋的', labelEn: 'Ugly' },
  { value: 'old', label: '老旧的', labelEn: 'Old' },
  { value: 'new', label: '新的', labelEn: 'New' },
  { value: 'broken', label: '破损的', labelEn: 'Broken' },
  { value: 'bright', label: '明亮的', labelEn: 'Bright' },
  { value: 'dark', label: '黑暗的', labelEn: 'Dark' },
  { value: 'any', label: '不限', labelEn: 'Any' },
];

// ==================== Helper Functions ====================

/**
 * Get label for a condition value
 */
export function getConditionLabel(
  type: 'gender' | 'maritalStatus' | 'occupation' | 'specialStatus' | 'timeOfDay' | 'season' | 'action' | 'color' | 'state',
  value: string
): string {
  const optionsMap: Record<string, Array<{ value: string; label: string }>> = {
    gender: GENDER_OPTIONS,
    maritalStatus: MARITAL_STATUS_OPTIONS,
    occupation: OCCUPATION_OPTIONS,
    specialStatus: SPECIAL_STATUS_OPTIONS,
    timeOfDay: TIME_OF_DAY_OPTIONS,
    season: SEASON_OPTIONS,
    action: ACTION_OPTIONS,
    color: COLOR_OPTIONS,
    state: STATE_OPTIONS,
  };

  const options = optionsMap[type];
  if (!options) return value;

  const option = options.find((opt) => opt.value === value);
  return option?.label ?? value;
}

/**
 * Check if a dreamer matches the given identity conditions
 */
export function matchesDreamerIdentity(
  dreamer: DreamerIdentity,
  condition: DreamerIdentity
): boolean {
  if (condition.gender && condition.gender !== 'any' && dreamer.gender !== condition.gender) {
    return false;
  }
  if (condition.maritalStatus && condition.maritalStatus !== 'any' && dreamer.maritalStatus !== condition.maritalStatus) {
    return false;
  }
  if (condition.occupation && condition.occupation !== 'any' && dreamer.occupation !== condition.occupation) {
    return false;
  }
  if (condition.specialStatus && condition.specialStatus !== 'none' && dreamer.specialStatus !== condition.specialStatus) {
    return false;
  }
  if (condition.ageRange) {
    // Age range matching would require dreamer to have an age field
    // This is a placeholder for future implementation
  }
  return true;
}

/**
 * Format condition for display
 */
export function formatConditionForDisplay(condition: InterpretationCondition): string {
  const parts: string[] = [];

  if (condition.dreamerIdentity) {
    const { gender, maritalStatus, occupation, specialStatus } = condition.dreamerIdentity;
    if (specialStatus && specialStatus !== 'none') {
      parts.push(getConditionLabel('specialStatus', specialStatus));
    }
    if (gender && gender !== 'any') {
      parts.push(getConditionLabel('gender', gender));
    }
    if (maritalStatus && maritalStatus !== 'any') {
      parts.push(getConditionLabel('maritalStatus', maritalStatus));
    }
    if (occupation && occupation !== 'any') {
      parts.push(getConditionLabel('occupation', occupation));
    }
  }

  if (condition.timeContext) {
    const { timeOfDay, season } = condition.timeContext;
    if (season && season !== 'any') {
      parts.push(getConditionLabel('season', season) + '季');
    }
    if (timeOfDay && timeOfDay !== 'any') {
      parts.push(getConditionLabel('timeOfDay', timeOfDay));
    }
  }

  if (condition.dreamDetails) {
    const { action, color, state } = condition.dreamDetails;
    if (action && action !== 'any') {
      parts.push(getConditionLabel('action', action));
    }
    if (color && color !== 'any') {
      parts.push(getConditionLabel('color', color));
    }
    if (state && state !== 'any') {
      parts.push(getConditionLabel('state', state));
    }
  }

  if (condition.customCondition) {
    parts.push(condition.customCondition);
  }

  return parts.length > 0 ? parts.join('、') : '通用';
}

/**
 * Get current time of day in traditional Chinese format
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 23 || hour < 1) return 'zi';
  if (hour >= 1 && hour < 3) return 'chou';
  if (hour >= 3 && hour < 5) return 'yin';
  if (hour >= 5 && hour < 7) return 'mao';
  if (hour >= 7 && hour < 9) return 'chen';
  if (hour >= 9 && hour < 11) return 'si';
  if (hour >= 11 && hour < 13) return 'wu';
  if (hour >= 13 && hour < 15) return 'wei';
  if (hour >= 15 && hour < 17) return 'shen';
  if (hour >= 17 && hour < 19) return 'you';
  if (hour >= 19 && hour < 21) return 'xu';
  return 'hai';
}

/**
 * Get current season
 */
export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1; // JavaScript months are 0-indexed
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

// ==================== Five Elements (五行) System ====================

/**
 * Five Elements type
 * 五行: 金木水火土
 */
export type WuXingElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

/**
 * Five Elements with detailed information
 * Based on 《黄帝内经》and traditional Chinese cosmology
 */
export interface WuXingElementInfo {
  value: WuXingElement;
  chinese: string;
  organ: string;           // Associated organ (脏腑)
  direction: string;       // Associated direction (方位)
  season: Season;          // Associated season (季节)
  emotion: string;         // Associated emotion (情绪)
  dreamContent: string;    // Dream content when element is excess (气盛时的梦象)
  color: DreamColor;       // Associated color (颜色)
}

/**
 * Complete Five Elements data based on 《黄帝内经·灵枢·淫邪发梦》
 */
export const WU_XING_ELEMENTS: WuXingElementInfo[] = [
  {
    value: 'wood',
    chinese: '木',
    organ: '肝',
    direction: '东',
    season: 'spring',
    emotion: '怒',
    dreamContent: '肝气盛，则梦怒。厥气客于肝，则梦山林树木。',
    color: 'blue',
  },
  {
    value: 'fire',
    chinese: '火',
    organ: '心',
    direction: '南',
    season: 'summer',
    emotion: '喜',
    dreamContent: '心气盛，则梦善笑恐畏。阳气盛，则梦大火燔灼。',
    color: 'red',
  },
  {
    value: 'earth',
    chinese: '土',
    organ: '脾',
    direction: '中',
    season: 'any',
    emotion: '思',
    dreamContent: '脾气盛，则梦歌乐、身体重不举。厥气客于脾，则梦丘陵大泽，坏屋风雨。',
    color: 'yellow',
  },
  {
    value: 'metal',
    chinese: '金',
    organ: '肺',
    direction: '西',
    season: 'autumn',
    emotion: '悲',
    dreamContent: '肺气盛，则梦恐惧、哭泣、飞扬。厥气客于肺，则梦飞扬，见金铁之奇物。',
    color: 'white',
  },
  {
    value: 'water',
    chinese: '水',
    organ: '肾',
    direction: '北',
    season: 'winter',
    emotion: '恐',
    dreamContent: '肾气盛，则梦腰脊两解不属。阴气盛，则梦涉大水而恐惧。',
    color: 'black',
  },
];

/**
 * Shichen (时辰) with detailed Five Element and Yin-Yang correspondence
 * Traditional twelve two-hour periods based on 《周易》and 《黄帝内经》
 */
export interface ShichenInfo {
  value: TimeOfDay;
  chinese: string;
  hourRange: string;
  element: WuXingElement;
  yinYang: 'yin' | 'yang' | 'transition';
  animal: string;          // 12 Zodiac animal
  organActive: string;     // Active organ during this period
  dreamTendency: string;   // Dream interpretation tendency
  source: string;          // Classical source
}

/**
 * Complete Shichen data with Five Element correlations
 */
export const SHICHEN_DETAILED: ShichenInfo[] = [
  {
    value: 'zi',
    chinese: '子时',
    hourRange: '23:00-01:00',
    element: 'water',
    yinYang: 'yin',
    animal: '鼠',
    organActive: '胆',
    dreamTendency: '阴气最盛，梦多涉水、恐惧之象。此时梦主隐秘、变化之事。',
    source: '《黄帝内经》阴气盛，则梦涉大水',
  },
  {
    value: 'chou',
    chinese: '丑时',
    hourRange: '01:00-03:00',
    element: 'earth',
    yinYang: 'yin',
    animal: '牛',
    organActive: '肝',
    dreamTendency: '肝经当令，梦多与决断、怒气相关。',
    source: '《灵枢》肝气盛，则梦怒',
  },
  {
    value: 'yin',
    chinese: '寅时',
    hourRange: '03:00-05:00',
    element: 'wood',
    yinYang: 'transition',
    animal: '虎',
    organActive: '肺',
    dreamTendency: '阳气初生，肺经当令。梦多与悲伤、飞翔相关。',
    source: '《灵枢》肺气盛，则梦恐惧、哭泣、飞扬',
  },
  {
    value: 'mao',
    chinese: '卯时',
    hourRange: '05:00-07:00',
    element: 'wood',
    yinYang: 'yang',
    animal: '兔',
    organActive: '大肠',
    dreamTendency: '阳气升发，梦多与新生、生长之象。',
    source: '《潜夫论》春梦发生',
  },
  {
    value: 'chen',
    chinese: '辰时',
    hourRange: '07:00-09:00',
    element: 'earth',
    yinYang: 'yang',
    animal: '龙',
    organActive: '胃',
    dreamTendency: '土气稳定，梦多与饮食、安定相关。龙时梦龙主大贵。',
    source: '《周公解梦》梦见龙，必富贵',
  },
  {
    value: 'si',
    chinese: '巳时',
    hourRange: '09:00-11:00',
    element: 'fire',
    yinYang: 'yang',
    animal: '蛇',
    organActive: '脾',
    dreamTendency: '阳气渐盛，梦多与思虑、变化相关。蛇时梦蛇主迁移。',
    source: '《敦煌本梦书》梦见蛇，主迁移',
  },
  {
    value: 'wu',
    chinese: '午时',
    hourRange: '11:00-13:00',
    element: 'fire',
    yinYang: 'yang',
    animal: '马',
    organActive: '心',
    dreamTendency: '阳气最盛，心经当令。梦多与喜悦、恐惧交杂。',
    source: '《灵枢》阳气盛，则梦大火燔灼',
  },
  {
    value: 'wei',
    chinese: '未时',
    hourRange: '13:00-15:00',
    element: 'earth',
    yinYang: 'transition',
    animal: '羊',
    organActive: '小肠',
    dreamTendency: '阴阳交替，梦多与消化、吸收相关。',
    source: '《黄帝内经》',
  },
  {
    value: 'shen',
    chinese: '申时',
    hourRange: '15:00-17:00',
    element: 'metal',
    yinYang: 'yang',
    animal: '猴',
    organActive: '膀胱',
    dreamTendency: '金气收敛，梦多与金属、奇物相关。',
    source: '《灵枢》厥气客于肺，则梦飞扬，见金铁之奇物',
  },
  {
    value: 'you',
    chinese: '酉时',
    hourRange: '17:00-19:00',
    element: 'metal',
    yinYang: 'yin',
    animal: '鸡',
    organActive: '肾',
    dreamTendency: '金气盛，梦多与财富、收获相关。鸡时梦鸡主报晓、喜讯。',
    source: '《周公解梦》',
  },
  {
    value: 'xu',
    chinese: '戌时',
    hourRange: '19:00-21:00',
    element: 'earth',
    yinYang: 'yin',
    animal: '狗',
    organActive: '心包',
    dreamTendency: '阴气渐盛，梦多与守护、忠诚相关。',
    source: '《周公解梦》',
  },
  {
    value: 'hai',
    chinese: '亥时',
    hourRange: '21:00-23:00',
    element: 'water',
    yinYang: 'yin',
    animal: '猪',
    organActive: '三焦',
    dreamTendency: '阴气初盛，水气旺盛。梦多与休息、潜藏相关。',
    source: '《黄帝内经》',
  },
];

/**
 * Seasonal Five Element Dominance (四季五行王相)
 * Based on 《潜夫论》五行王相 theory
 */
export interface SeasonalElementInfo {
  season: Season;
  chinese: string;
  dominantElement: WuXingElement;   // 王 (dominant)
  assistingElement: WuXingElement;  // 相 (assisting)
  restingElement: WuXingElement;    // 休 (resting)
  prisonedElement: WuXingElement;   // 囚 (imprisoned)
  deadElement: WuXingElement;       // 死 (dead)
  dreamCharacteristics: string;     // 梦的特征
  source: string;
}

/**
 * Seasonal Five Element dominance data
 * Source: 《潜夫论·梦列》"时梦"类
 */
export const SEASONAL_ELEMENTS: SeasonalElementInfo[] = [
  {
    season: 'spring',
    chinese: '春',
    dominantElement: 'wood',
    assistingElement: 'fire',
    restingElement: 'water',
    prisonedElement: 'metal',
    deadElement: 'earth',
    dreamCharacteristics: '春梦发生 - 生发之象，梦多关于新生、成长、希望。木旺则肝气盛，易梦怒。',
    source: '《潜夫论》春：木王火相水休金囚土死',
  },
  {
    season: 'summer',
    chinese: '夏',
    dominantElement: 'fire',
    assistingElement: 'earth',
    restingElement: 'wood',
    prisonedElement: 'water',
    deadElement: 'metal',
    dreamCharacteristics: '夏梦高明 - 高明之象，梦多关于成就、光明、热情。火旺则心气盛，易梦笑与恐惧。',
    source: '《潜夫论》夏梦高明',
  },
  {
    season: 'autumn',
    chinese: '秋',
    dominantElement: 'metal',
    assistingElement: 'water',
    restingElement: 'earth',
    prisonedElement: 'fire',
    deadElement: 'wood',
    dreamCharacteristics: '秋梦熟藏 - 收敛之象，梦多关于收获、完成、金钱。金旺则肺气盛，易梦悲泣、飞翔。',
    source: '《潜夫论》秋冬梦熟藏',
  },
  {
    season: 'winter',
    chinese: '冬',
    dominantElement: 'water',
    assistingElement: 'wood',
    restingElement: 'metal',
    prisonedElement: 'earth',
    deadElement: 'fire',
    dreamCharacteristics: '冬梦熟藏 - 藏伏之象，梦多关于休息、隐藏、深层事物。水旺则肾气盛，易梦涉水、恐惧。',
    source: '《潜夫论》秋冬梦熟藏',
  },
];

// ==================== Reverse Dream Logic (反梦逻辑) ====================

/**
 * Reverse Dream (反梦) indicator
 * Based on 《潜夫论·梦列》"反梦"类 and 敦煌梦书
 */
export interface ReverseDreamIndicator {
  id: string;
  dreamContent: string;       // 梦见内容
  literalMeaning: string;     // 字面意义
  actualInterpretation: string; // 实际解释
  isReverseDream: boolean;
  principle: string;          // 原理
  source: string;
  originalText?: string;
}

/**
 * Classic reverse dream examples from ancient texts
 * Source: 敦煌《新集周公解梦书》, 《潜夫论·梦列》
 */
export const REVERSE_DREAM_EXAMPLES: ReverseDreamIndicator[] = [
  {
    id: 'rd_death_self',
    dreamContent: '梦见自己死',
    literalMeaning: '自己死亡',
    actualInterpretation: '主长命',
    isReverseDream: true,
    principle: '阴极则吉，死为阴之极',
    source: '敦煌本梦书',
    originalText: '梦见身死，主长命',
  },
  {
    id: 'rd_parents_death',
    dreamContent: '梦见父母亡',
    literalMeaning: '父母去世',
    actualInterpretation: '大吉',
    isReverseDream: true,
    principle: '物极必反，至亲之死反主吉',
    source: '敦煌本梦书',
    originalText: '梦见父母亡，大吉',
  },
  {
    id: 'rd_siblings_fighting',
    dreamContent: '梦见兄弟相打',
    literalMeaning: '兄弟打架',
    actualInterpretation: '和合',
    isReverseDream: true,
    principle: '争斗之极反主和睦',
    source: '敦煌本梦书',
    originalText: '梦见兄弟相打，和合',
  },
  {
    id: 'rd_killed_by_knife',
    dreamContent: '梦见被刀杀',
    literalMeaning: '被刀杀死',
    actualInterpretation: '得长命',
    isReverseDream: true,
    principle: '死于兵刃，反主长寿',
    source: '敦煌本梦书',
    originalText: '梦见被刀杀者，得长命',
  },
  {
    id: 'rd_crying',
    dreamContent: '梦见大哭',
    literalMeaning: '悲伤哭泣',
    actualInterpretation: '主有喜事',
    isReverseDream: true,
    principle: '悲之极反为喜',
    source: '周公解梦',
  },
  {
    id: 'rd_coffin',
    dreamContent: '梦见棺材',
    literalMeaning: '死亡象征',
    actualInterpretation: '升官发财',
    isReverseDream: true,
    principle: '棺=官，材=财，谐音转义',
    source: '敦煌本梦书',
    originalText: '梦见棺木，民吏迁官',
  },
  {
    id: 'rd_house_fire',
    dreamContent: '梦见房子着火',
    literalMeaning: '灾难、损失',
    actualInterpretation: '主大发财',
    isReverseDream: true,
    principle: '火为财之象，红火即兴旺',
    source: '周公解梦',
  },
];

/**
 * Conditions that trigger reverse dream interpretation
 */
export const REVERSE_DREAM_CONDITIONS: string[] = [
  '梦象走向极端（极端之象）',
  '梦境明显与正常秩序相反',
  '健康人梦见死亡/毁灭之象',
  '阴阳交替时刻（子时、午时）做的梦',
  '梦中情绪与内容强烈矛盾',
];

// ==================== Five Non-Interpretations (五不占原则) ====================

/**
 * Five Non-Interpretation conditions (五不占)
 * When NOT to interpret dreams
 * Source: 《梦林玄解》
 */
export interface NonInterpretationRule {
  id: string;
  chineseName: string;
  originalText: string;
  explanation: string;
  englishName: string;
  checkCondition: string;   // How to identify this condition
}

/**
 * Five conditions when dreams should NOT be interpreted
 * 五不占原则
 */
export const WU_BU_ZHAN: NonInterpretationRule[] = [
  {
    id: 'nbz_spirit_unsettled',
    chineseName: '神魂未定',
    originalText: '神魂未定而梦者不占',
    explanation: '神魂未定者（如幼儿、重病患者）所做的梦不宜占卜解释',
    englishName: 'Spirit Unsettled',
    checkCondition: '询问是否为儿童或重病患者',
  },
  {
    id: 'nbz_interrupted',
    chineseName: '中途惊醒',
    originalText: '梦而未终中途惊醒者不占',
    explanation: '梦境未完整、中途被惊醒的梦不宜占卜',
    englishName: 'Interrupted Dream',
    checkCondition: '询问梦是否完整，是否被惊醒',
  },
  {
    id: 'nbz_already_knew',
    chineseName: '已知凶厄',
    originalText: '寤知凶厄者不占',
    explanation: '醒来时已知道是不好的梦，已有意识影响，不宜占卜',
    englishName: 'Already Knew Bad',
    checkCondition: '询问醒来时是否已感觉是凶兆',
  },
  {
    id: 'nbz_mostly_forgotten',
    chineseName: '遗忘大半',
    originalText: '醒后忘佚大半者不占',
    explanation: '醒来后遗忘了梦境大部分内容的不宜占卜',
    englishName: 'Mostly Forgotten',
    checkCondition: '询问能否完整描述梦境',
  },
  {
    id: 'nbz_confused_jumbled',
    chineseName: '杂梦混淆',
    originalText: '忘忽杂梦者不占',
    explanation: '梦境混乱、杂乱无章的不宜占卜',
    englishName: 'Confused Jumbled',
    checkCondition: '询问梦境是否有清晰脉络',
  },
];

/**
 * Five Non-Verification conditions (五不验)
 * When dream interpretation will NOT prove accurate
 * Source: 《梦林玄解》
 */
export const WU_BU_YAN: NonInterpretationRule[] = [
  {
    id: 'nby_unknown_origin',
    chineseName: '昧其本原',
    originalText: '昧其本原者不验',
    explanation: '不了解梦的根本原因则解释不会应验',
    englishName: 'Unknown Origin',
    checkCondition: '是否了解做梦者近期生活状况',
  },
  {
    id: 'nby_not_professional',
    chineseName: '术业不专',
    originalText: '术业不专者不验',
    explanation: '解梦者缺乏专业知识则不会应验',
    englishName: 'Not Professional',
    checkCondition: 'AI系统需确保知识库完整',
  },
  {
    id: 'nby_insincere',
    chineseName: '精诚未至',
    originalText: '精诚未至者不验',
    explanation: '缺乏诚心和专注则不会应验',
    englishName: 'Insincere',
    checkCondition: '做梦者是否认真对待解梦',
  },
  {
    id: 'nby_cannot_connect',
    chineseName: '不能连类',
    originalText: '不能连类传观者不验',
    explanation: '无法将梦象进行关联分析则不会应验',
    englishName: 'Cannot Connect Patterns',
    checkCondition: '是否能找到相关梦象进行综合分析',
  },
  {
    id: 'nby_incomplete_description',
    chineseName: '述说不详',
    originalText: '梦者述说不详者不验',
    explanation: '做梦者描述不完整则不会应验',
    englishName: 'Incomplete Description',
    checkCondition: '做梦者是否提供了足够的梦境细节',
  },
];

/**
 * Dream types that should not use standard prophetic interpretation
 * Based on 《周礼》Six Dreams Classification and 《梦占逸旨》
 */
export interface NonPropheticDreamType {
  id: string;
  chineseName: string;
  definition: string;
  interpretationApproach: string;
  source: string;
}

/**
 * Dreams caused by emotional or physical states, not suitable for prophetic interpretation
 */
export const NON_PROPHETIC_DREAM_TYPES: NonPropheticDreamType[] = [
  {
    id: 'npd_thought',
    chineseName: '思梦',
    definition: '因思念谋虑而致之梦',
    interpretationApproach: '反映心理状态，非预言性质。引导做梦者反思日间思虑。',
    source: '《周礼》六梦',
  },
  {
    id: 'npd_half_awake',
    chineseName: '寤梦',
    definition: '半醒半睡时之梦',
    interpretationApproach: '不可靠，不宜作为占卜依据。',
    source: '《周礼》六梦',
  },
  {
    id: 'npd_joy',
    chineseName: '喜梦',
    definition: '因高兴喜悦而致之梦',
    interpretationApproach: '情绪来源，反映心情而非预兆。',
    source: '《周礼》六梦',
  },
  {
    id: 'npd_fear',
    chineseName: '惧梦',
    definition: '因恐惧畏惧而致之梦',
    interpretationApproach: '情绪来源，反映恐惧心理，建议心理疏导。',
    source: '《周礼》六梦',
  },
  {
    id: 'npd_qi_depleted',
    chineseName: '气虚之梦',
    definition: '因气血虚弱而致之梦',
    interpretationApproach: '医学角度，建议调养身体，非占卜意义。',
    source: '《梦占逸旨》',
  },
  {
    id: 'npd_external_illness',
    chineseName: '邪寓之梦',
    definition: '因外邪入侵而致之梦',
    interpretationApproach: '医学角度，可能预示疾病，建议就医。',
    source: '《梦占逸旨》',
  },
  {
    id: 'npd_physical_blockage',
    chineseName: '体滞之梦',
    definition: '因身体阻滞而致之梦',
    interpretationApproach: '医学角度，反映身体状态，建议注意健康。',
    source: '《梦占逸旨》',
  },
];

// ==================== Helper Functions for New Features ====================

/**
 * Get Shichen info for a given time
 */
export function getShichenInfo(timeOfDay: TimeOfDay): ShichenInfo | undefined {
  return SHICHEN_DETAILED.find(s => s.value === timeOfDay);
}

/**
 * Get element info
 */
export function getElementInfo(element: WuXingElement): WuXingElementInfo | undefined {
  return WU_XING_ELEMENTS.find(e => e.value === element);
}

/**
 * Get seasonal element info
 */
export function getSeasonalElementInfo(season: Season): SeasonalElementInfo | undefined {
  return SEASONAL_ELEMENTS.find(s => s.season === season);
}

/**
 * Check if a dream might be a reverse dream
 */
export function isLikelyReverseDream(dreamContent: string): ReverseDreamIndicator | undefined {
  const lowerContent = dreamContent.toLowerCase();
  return REVERSE_DREAM_EXAMPLES.find(rd =>
    rd.dreamContent.includes(lowerContent) || lowerContent.includes(rd.dreamContent)
  );
}

/**
 * Check Five Non-Interpretation rules
 * Returns applicable rules based on context
 */
export function checkNonInterpretationRules(context: {
  isChild?: boolean;
  isSick?: boolean;
  wasInterrupted?: boolean;
  mostlyForgotten?: boolean;
  isConfused?: boolean;
  knewBad?: boolean;
}): NonInterpretationRule[] {
  const applicableRules: NonInterpretationRule[] = [];

  if (context.isChild || context.isSick) {
    applicableRules.push(WU_BU_ZHAN[0]); // 神魂未定
  }
  if (context.wasInterrupted) {
    applicableRules.push(WU_BU_ZHAN[1]); // 中途惊醒
  }
  if (context.knewBad) {
    applicableRules.push(WU_BU_ZHAN[2]); // 已知凶厄
  }
  if (context.mostlyForgotten) {
    applicableRules.push(WU_BU_ZHAN[3]); // 遗忘大半
  }
  if (context.isConfused) {
    applicableRules.push(WU_BU_ZHAN[4]); // 杂梦混淆
  }

  return applicableRules;
}

/**
 * Get dream interpretation context based on time
 */
export function getDreamTimeContext(timeOfDay: TimeOfDay, season: Season): string {
  const shichen = getShichenInfo(timeOfDay);
  const seasonInfo = getSeasonalElementInfo(season);

  let context = '';

  if (shichen) {
    context += `${shichen.chinese}（${shichen.hourRange}）属${shichen.element === 'water' ? '水' :
      shichen.element === 'wood' ? '木' : shichen.element === 'fire' ? '火' :
      shichen.element === 'metal' ? '金' : '土'}，${shichen.yinYang === 'yin' ? '阴气' :
      shichen.yinYang === 'yang' ? '阳气' : '阴阳交替'}。${shichen.dreamTendency}`;
  }

  if (seasonInfo) {
    context += ` 时值${seasonInfo.chinese}季，${seasonInfo.dominantElement === 'water' ? '水' :
      seasonInfo.dominantElement === 'wood' ? '木' : seasonInfo.dominantElement === 'fire' ? '火' :
      seasonInfo.dominantElement === 'metal' ? '金' : '土'}气当令。${seasonInfo.dreamCharacteristics}`;
  }

  return context;
}
