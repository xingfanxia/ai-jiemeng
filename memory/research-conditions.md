# Research: Conditional Dream Interpretation System (条件性解梦体系)

## Overview

Chinese traditional dream interpretation is fundamentally **conditional** - the same dream symbol yields vastly different meanings based on the dreamer's identity, time of dream, emotional context, and other factors. This document synthesizes findings from ancient texts including 《周礼》, 《潜夫论·梦列》, 《梦林玄解》, and 敦煌梦书.

---

## 1. Dreamer Identity Conditions (梦者身份条件)

### 1.1 Gender Distinction (男女之别)

The same dream can have opposite meanings for men vs women.

**Source**: 《潜夫论·梦列》, 东汉王符
> "熊罴为男子祥，虺蛇为女子祥"
> (Bears signify auspiciousness for men; snakes signify auspiciousness for women)

**Implications for AI**:
- Snake dreams for pregnant women → 生贵子 (bear noble son)
- Snake dreams for men → different interpretation (may indicate changes/移徙)

### 1.2 Social Status/Class (身份之别)

**Core Principle - Source**: 《潜夫论·梦列》"人梦"类
> "**贵人梦之即为祥，贱人梦之即为妖**"
> (When nobles dream it, it is auspicious; when commoners dream it, it is ominous)

> "君子梦之即为荣，小人梦之即为辱"
> (When gentlemen dream it, it brings honor; when petty people dream it, it brings disgrace)

**Occupation-Specific Interpretations**:

| Dreamer Type | Same Dream | Interpretation |
|--------------|------------|----------------|
| 官员 (Officials) | 梦见棺木 | 迁官 (promotion) |
| 商人 (Merchants) | 梦见棺木 | 得财 (gain wealth) - 棺=官=财 phonetic link |
| 农民 (Farmers) | 梦见棺木 | 可能凶兆 |
| 学生 (Students) | 梦见龙 | 科举成功 |
| 士兵 (Soldiers) | 梦见刀剑 | 得钱财 (敦煌本) |
| 僧侣 (Monks) | 梦见肉食 | 破戒之兆 |

### 1.3 Marital Status (婚姻状态)

| Status | Dream of Marriage | Interpretation |
|--------|------------------|----------------|
| 未婚 (Unmarried) | 梦见结婚 | 吉，婚事将近 |
| 已婚 (Married) | 梦见结婚 | 需谨慎解释 |
| 丧偶 (Widowed) | 梦见亡配偶 | 思念，可能需禳解 |

### 1.4 Special States (特殊状态)

**孕妇 (Pregnant Women)** - Most documented special condition:

**Source**: 《梦林玄解》
> "孕妇梦蛇入怀，主生贵子"
> (Pregnant woman dreams snake enters bosom → will bear noble son)

**Source**: 《潜夫论》
> "熊罴为男子祥，虺蛇为女子祥" - applied to pregnancy dreams predicting child's gender

**病人 (Sick Persons)** - Dreams interpreted through medical lens:

**Source**: 《黄帝内经·灵枢·淫邪发梦》
> "阴病梦寒，阳病梦热"
> (Yin diseases cause cold dreams; Yang diseases cause hot dreams)

**老人 (Elderly)**:
- Dreams of death → may indicate longevity (反梦 principle)
- Dreams should consider weakening vital energy

**儿童 (Children)**:
- Less reliable for divination
- Related to 五不占 principles (神魂未定)

---

## 2. Time-Based Conditions (时间条件)

### 2.1 Twelve Shichen Dream Method (十二时辰占梦法)

Dreams occurring at different hours of the day carry different meanings based on the dominant element.

**Traditional Time-Element Correspondence**:

| 时辰 | Modern Time | Element | Dream Tendency |
|------|-------------|---------|----------------|
| 子时 | 23:00-01:00 | 水 (Water) | 阴气最盛 |
| 丑时 | 01:00-03:00 | 土 (Earth) | |
| 寅时 | 03:00-05:00 | 木 (Wood) | |
| 卯时 | 05:00-07:00 | 木 (Wood) | 阳气初生 |
| 辰时 | 07:00-09:00 | 土 (Earth) | |
| 巳时 | 09:00-11:00 | 火 (Fire) | |
| 午时 | 11:00-13:00 | 火 (Fire) | 阳气最盛 |
| 未时 | 13:00-15:00 | 土 (Earth) | |
| 申时 | 15:00-17:00 | 金 (Metal) | |
| 酉时 | 17:00-19:00 | 金 (Metal) | |
| 戌时 | 19:00-21:00 | 土 (Earth) | |
| 亥时 | 21:00-23:00 | 水 (Water) | 阴气初盛 |

### 2.2 Four Seasons (四季变化)

**Source**: 《潜夫论·梦列》"时梦"类
> "**春梦发生，夏梦高明，秋冬梦熟藏**"
> (Spring dreams: birth/growth; Summer dreams: brilliance/height; Autumn/Winter dreams: ripening/storage)

**Seasonal Five-Element Correspondence**:

| Season | Dominant Element | Dream Characteristics |
|--------|-----------------|----------------------|
| 春 (Spring) | 木王火相 | 生发之象 - dreams of growth, new beginnings |
| 夏 (Summer) | 火王土相 | 高明之象 - dreams of achievement, brilliance |
| 秋 (Autumn) | 金王水相 | 收敛之象 - dreams of harvest, completion |
| 冬 (Winter) | 水王木相 | 藏伏之象 - dreams of rest, hidden matters |

**Source**: 《潜夫论》五行王相 (Five Phase Dominance)
> "春：木王火相水休金囚土死"
> (Spring: Wood dominates, Fire assists, Water rests, Metal imprisoned, Earth dead)

### 2.3 Five Elements Correlation (五行配合)

Dreams should be interpreted considering the interaction between:
1. **Dreamer's birth element** (本命五行)
2. **Season's dominant element** (时令五行)
3. **Dream content's element** (梦象五行)

**Element-Dream Symbol Associations** from 《黄帝内经》:

| Element | Associated Organs | Dream Content When Excess |
|---------|------------------|--------------------------|
| 木 (Wood) | 肝 (Liver) | 梦怒 - angry dreams |
| 火 (Fire) | 心 (Heart) | 梦善笑恐畏 - laughing/fear |
| 土 (Earth) | 脾 (Spleen) | 梦歌乐、身体重不举 - singing, heaviness |
| 金 (Metal) | 肺 (Lung) | 梦恐惧、哭泣、飞扬 - fear, crying, flying |
| 水 (Water) | 肾 (Kidney) | 梦腰脊两解不属 - disconnected spine |

---

## 3. Dream Context Conditions (梦境情境条件)

### 3.1 Dream Emotions (梦中情绪)

**Source**: 《梦占逸旨》"情溢"之梦 (陈士元创说)
> "过喜则梦开，过怒则梦闭，过惧则梦匿，过忧则梦嗔，过哀则梦救"
> (Excess joy → dreams of opening; Excess anger → dreams of closing; Excess fear → dreams of hiding; Excess worry → dreams of anger; Excess sorrow → dreams of rescue)

**General Emotional Principle**:
- 梦中快乐 → Generally 吉 (auspicious)
- 梦中恐惧 → Generally 凶 (ominous)

**Source**: 《潜夫论》占梦判断标准
> 吉象：清洁鲜好、貌坚健、升上向兴
> 凶象：臭污腐烂、枯槁、坠下向衰

### 3.2 Dream Details (梦境细节)

**Colors (颜色)**:

| Color | Element | Generally |
|-------|---------|-----------|
| 白 (White) | 金 | 可吉可凶 - context dependent |
| 黑 (Black) | 水 | 阴性，需具体分析 |
| 红 (Red) | 火 | 吉多，喜庆 |
| 黄 (Yellow) | 土 | 中正，稳重 |
| 青 (Blue/Green) | 木 | 生发之象 |
| 金 (Gold) | 金 | 富贵之象 |

**Quantity/Numbers (数量)**:
- Related to 河图洛书 numerology
- Odd numbers (阳数) vs Even numbers (阴数)

**Direction (方向)**:

| Direction | Element | Significance |
|-----------|---------|--------------|
| 东 (East) | 木 | 生发 |
| 南 (South) | 火 | 兴旺 |
| 西 (West) | 金 | 收敛 |
| 北 (North) | 水 | 藏伏 |
| 中 (Center) | 土 | 稳定 |

### 3.3 Action Types (动作类型)

| Action Type | Interpretation Tendency |
|-------------|------------------------|
| 主动 (Active) | Dreamer has agency, often more positive |
| 被动 (Passive) | External forces, may indicate challenges |
| 追逐 (Chasing) | Context-dependent on who chases whom |
| 飞翔 (Flying) | 上盛则梦飞 (rising energy) |
| 坠落 (Falling) | 下盛则梦堕 (descending energy) |

---

## 4. Reverse Dream Logic (反梦逻辑)

### 4.1 Core Principle

**Source**: 《潜夫论·梦列》"反梦"类
> "**阴极则吉，阳极则凶**"
> (When Yin reaches its extreme, it becomes auspicious; when Yang reaches its extreme, it becomes ominous)

This reflects the 物极必反 (things reverse at their extremes) principle from Daoist philosophy.

### 4.2 Classic Examples of Reverse Dreams

**From敦煌梦书 - Human Affairs Category (人事类·反占典型)**:

| Dream Content | Literal Meaning | Actual Interpretation |
|---------------|-----------------|----------------------|
| **梦见身死** | Dreaming of own death | **主长命** (indicates longevity) |
| **梦见父母亡** | Dreaming parents die | **大吉** (great auspiciousness) |
| 梦见兄弟相打 | Dreaming siblings fight | **和合** (harmony) |
| 梦见被刀杀 | Dreaming of being killed by knife | 得长命 (gain longevity) |

**Historical Example**:

**Source**: 《潜夫论》
> "晋文公梦楚子伏己盬脑，反而大胜"
> (Duke Wen of Jin dreamed the King of Chu prostrated over him and licked his brain - an extremely bad omen by literal reading, but he achieved great victory instead)

### 4.3 When to Apply Reverse Interpretation

**Conditions for 反梦**:
1. Dream content reaches an extreme (极端之象)
2. Dream is clearly opposite to normal order
3. Death/destruction dreams by healthy individuals
4. Dreams at transitional times (阴阳交替时刻)

**Source**: 《梦占逸旨》"反极"之梦
> 陈士元解释：梦象走向极端时，往往会向相反方向转化

---

## 5. The Five Non-Interpretations (五不占原则)

### 5.1 When NOT to Interpret Dreams

**Source**: Synthesized from 《梦林玄解》and related texts

| Condition | Original Chinese | Explanation |
|-----------|-----------------|-------------|
| **神魂未定** | 神魂未定而梦者不占 | Spirit/soul unsettled (children, severe illness) |
| **中途惊醒** | 梦而未终中途惊醒者不占 | Interrupted dream, not complete |
| **已知凶厄** | 寤知凶厄者不占 | Awoke knowing it was bad - already conscious influence |
| **遗忘大半** | 醒后忘佚大半者不占 | Forgot most of the dream |
| **杂梦混淆** | 忘忽杂梦者不占 | Confused, jumbled dreams |

### 5.2 The Five Non-Verifications (五不验)

**Source**: 《梦林玄解》

When dream interpretation will NOT prove accurate:

| Condition | Original Chinese | Explanation |
|-----------|-----------------|-------------|
| **昧其本原** | 昧其本原者不验 | Unaware of the dream's root cause |
| **术业不专** | 术业不专者不验 | Interpreter lacks expertise |
| **精诚未至** | 精诚未至者不验 | Insufficient sincerity/focus |
| **不能连类** | 不能连类传观者不验 | Cannot connect patterns and analogies |
| **述说不详** | 梦者述说不详者不验 | Dreamer's description is incomplete |

### 5.3 Other Dream Categories Not for Standard Interpretation

**From 《周礼》Six Dreams Classification**:

| Dream Type | Definition | Interpretation Approach |
|------------|------------|------------------------|
| 思梦 | 因思念谋虑而致之梦 | Caused by thinking - reflects mind state, not prophetic |
| 寤梦 | 半醒半睡时之梦 | Half-awake dreams - unreliable |
| 喜梦 | 因高兴喜悦而致之梦 | Caused by happiness - emotional origin |
| 惧梦 | 因恐惧畏惧而致之梦 | Caused by fear - emotional origin |

**From 《梦占逸旨》additional non-prophetic types**:
- **气虚之梦**: Dreams from depleted energy - medical, not divinatory
- **邪寓之梦**: Dreams from external illness - medical
- **体滞之梦**: Dreams from physical blockage - medical

---

## 6. Implementation Recommendations for AI System

### 6.1 Condition Priority Order

When multiple conditions apply, prioritize:
1. **五不占检查** - First check if dream should be interpreted at all
2. **身份条件** - Dreamer identity (孕妇, 官员, etc.)
3. **特殊状态** - Special conditions (病人, 老人)
4. **时间条件** - Time of dream (时辰, 季节)
5. **反梦判断** - Check if reverse interpretation applies
6. **情境细节** - Emotional and contextual details

### 6.2 Data Model Enhancements

```json
{
  "conditional_interpretation": {
    "base_symbol": "蛇",
    "conditions": [
      {
        "condition_type": "dreamer_identity",
        "condition_value": "孕妇",
        "interpretation": "主生贵子",
        "fortune": "大吉",
        "source": "《梦林玄解》",
        "original_text": "孕妇梦蛇入怀，主生贵子"
      },
      {
        "condition_type": "gender",
        "condition_value": "女",
        "interpretation": "女子之祥",
        "fortune": "吉",
        "source": "《潜夫论·梦列》",
        "original_text": "虺蛇为女子祥"
      }
    ],
    "reverse_dream_applicable": false,
    "five_non_interpretation_notes": "神魂未定者（如幼儿）梦蛇不宜占"
  }
}
```

### 6.3 Question Flow for Conditional Interpretation

Suggested user prompts to gather condition data:
1. "您的性别是？" (男/女)
2. "您目前的状态是？" (孕妇/病人/正常)
3. "您的职业类型是？" (optional)
4. "做梦的大约时间是？" (optional, for 时辰判断)
5. "目前是什么季节？" (for 四季判断)
6. "梦中的情绪是？" (快乐/恐惧/平静)

---

## Key Sources Referenced

1. **《周礼·春官·占梦》** - 六梦分类法
2. **《黄帝内经·灵枢·淫邪发梦》** - 病梦诊断体系
3. **《潜夫论·梦列》** (东汉·王符) - 十梦分类，"人梦"身份条件
4. **《梦占逸旨》** (明·陈士元) - 九梦分类，"比象""情溢"创说
5. **《梦林玄解》** (明代集大成) - 34卷，23卷梦占条目
6. **敦煌《新集周公解梦书》** (唐五代) - 民间解梦实录，反占典型
7. **刘文英《梦的迷信与梦的探索》** - 现代学术权威
8. **郑炳林《敦煌写本解梦书校录研究》** - 敦煌梦书校注本

---

*Document created: 2026-01-11*
*Purpose: AI Dream Interpretation Knowledge Base - Conditional System Research*
