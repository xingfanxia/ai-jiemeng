# AI Dream Interpretation App - Requirements Synthesis

**Project**: AI Zhou Gong Dream Interpretation App
**Based on**: Technical Design Doc + Ancient Dream Text Research Guide
**Date**: 2026-01-11

---

## 1. Core Features (P0 - MVP Must-Haves)

### 1.1 Dream Recording

| Feature | Requirements | Priority |
|---------|--------------|----------|
| **Text Input** | Rich text editor with emoji/symbol support | P0 |
| **Voice Recording** | Speech-to-text with Jieba + custom dream dictionary | P0 |
| **Quick Capture** | Wake-up mode for immediate recording (minimal UI friction) | P0 |
| **Basic Metadata** | Date, time, sleep duration, dream clarity (1-10) | P0 |

### 1.2 AI Interpretation System

**Core Capabilities:**
- Extract key dream symbols (NER: persons, animals, scenes, objects, actions, emotions)
- Match symbols against knowledge base (7000+ entries)
- Generate multi-perspective interpretation (traditional + psychological)
- Support conditional interpretation (dreamer type, context, emotions)

**Output Structure:**
1. Symbol Recognition - key imagery extraction
2. Emotional Tone - identify dominant dream emotion
3. Traditional Interpretation - Zhou Gong / folk perspective
4. Psychological Perspective - modern psychology (Freud/Jung)
5. Integrated Insight - synthesized core message
6. Self-Reflection Prompts - personalized questions for user

### 1.3 Symbol Dictionary

**MVP Requirements:**
- Searchable dictionary with 7000+ dream symbol entries
- Category browsing (10-12 major categories)
- Symbol detail pages with:
  - Multiple interpretations (by source)
  - Conditional variations (dreamer type)
  - Related symbols
  - Lucky numbers (traditional)
  - Psychological analysis

---

## 2. Knowledge Base Requirements

### 2.1 Data Structure for Dream Symbols

**Recommended JSON Schema:**

```json
{
  "dream_symbol": {
    "id": "ds_snake_001",
    "name": "蛇",
    "aliases": ["长虫", "青蛇", "白蛇", "大蟒蛇", "毒蛇"],
    "pinyin": "she",
    "category": {
      "primary": "动物类",
      "secondary": "爬行动物",
      "tags": ["常见梦象", "吉凶两面"]
    }
  },
  "interpretations": [
    {
      "interpretation_id": "int_001",
      "content": "主得大财，不怕凶险",
      "fortune": {
        "type": "吉",
        "score": 75,
        "aspects": {"wealth": "positive", "health": "neutral"}
      },
      "conditions": {
        "dreamer_identity": ["general"],
        "dream_details": {"action": "被蛇咬"}
      },
      "source": {
        "book_name": "周公解梦原版",
        "dynasty": "三国",
        "reliability": "原典",
        "original_text": "蛇咬人主得大财"
      }
    },
    {
      "interpretation_id": "int_002",
      "content": "胎梦，暗示将生贵子",
      "fortune": {"type": "大吉", "score": 90},
      "conditions": {
        "dreamer_identity": ["孕妇"],
        "dream_details": {"action": "蛇入怀"}
      },
      "source": {
        "book_name": "梦林玄解",
        "dynasty": "明",
        "reliability": "原典"
      }
    }
  ],
  "related_symbols": [
    {"keyword": "水", "combined_meaning": "蛇在水中，主迁事吉"},
    {"keyword": "龙", "relationship": "transformation"}
  ],
  "psychological_analysis": "蛇象征本能能量、转化（蜕皮）、潜意识力量",
  "lucky_numbers": [2, 8, 12]
}
```

### 2.2 Interpretation Conditions Framework

**Dreamer Identity Factors:**
```json
{
  "gender": ["男", "女"],
  "marital_status": ["未婚", "已婚", "丧偶", "离异"],
  "occupation": ["商人", "官员", "农民", "学生", "士兵", "僧侣"],
  "special_status": ["孕妇", "病人", "老人", "儿童"]
}
```

**Context Factors:**
```json
{
  "time_context": {
    "time_of_day": ["子时", "丑时", "寅时", ...],
    "season": ["春", "夏", "秋", "冬"]
  },
  "dream_details": {
    "action_verbs": ["看见", "被追", "杀死", "吃", "抓住", "逃跑", "飞翔"],
    "colors": ["白", "黑", "红", "黄", "青", "金"],
    "states": ["活", "死", "受伤", "巨大", "微小"],
    "emotions": ["恐惧", "快乐", "焦虑", "悲伤"]
  }
}
```

**Key Rules:**
- "贵人梦之即为祥，贱人梦之即为妖" - same symbol differs by dreamer status
- Pregnant women's dreams have special prenatal interpretations
- Emotion in dream affects fortune (快乐→吉, 恐惧→凶)
- Five elements (五行) and seasonal factors

### 2.3 Sources to Integrate (Priority Order)

| Source | Era | Entries | Reliability | Priority |
|--------|-----|---------|-------------|----------|
| **敦煌本《新集周公解梦书》** | Tang Dynasty | ~200 | ★★★★★ | P0 - Core |
| **《梦林玄解》** | Ming (1636) | 34卷 | ★★★★★ | P0 - Core |
| **《周公解梦》通行本** | Three Kingdoms | 900+ verses | ★★ | P1 - Supplement |
| **《潜夫论·梦列》** | Eastern Han | Theory | ★★★★ | P1 - Theory |
| **《黄帝内经》病梦** | Pre-Qin | 27 entries | ★★★★ | P2 - Medical |
| **聚合数据 API** | Modern | 50,000+ | ★★ | Data expansion |
| **CSDN MySQL Dataset** | Modern | ~9,000 | ★★ | Data expansion |

### 2.4 Multi-Source Conflict Resolution

**Strategy: Weighted Average + Show All**

```json
{
  "symbol": "蛇",
  "interpretations_by_source": [
    {"source": "敦煌占梦书", "interpretation": "主迁移", "fortune": "中平", "weight": 0.9},
    {"source": "梦林玄解", "interpretation": "文士显扬", "fortune": "吉", "weight": 0.8},
    {"source": "民间通行本", "interpretation": "得财", "fortune": "吉", "weight": 0.5}
  ],
  "consensus_logic": "weighted_average",
  "conflict_resolution": "show_all_with_source",
  "display_strategy": "primary_source_first_then_alternatives"
}
```

**Reliability Weights:**
| Source Type | Weight |
|-------------|--------|
| Dunhuang manuscripts (敦煌本) | 0.9 |
| Academic editions (刘文英/郑炳林校注) | 0.9 |
| Ming dynasty compilations (梦林玄解) | 0.8 |
| Folk circulation versions | 0.5 |
| Modern API data | 0.4 (validation only) |

---

## 3. AI System Requirements

### 3.1 System Prompt Template

```markdown
# Role Definition
You are "Zhou Gong AI Dream Interpreter" - a professional dream analysis consultant integrating traditional Chinese Zhou Gong dream wisdom with modern psychology.

## Interpretation Framework
1. 【Symbol Recognition】: Extract key imagery (persons, animals, scenes, objects, actions)
2. 【Emotional Tone】: Identify dominant dream emotion
3. 【Traditional Interpretation】: Zhou Gong / folk symbolism perspective
4. 【Psychological Perspective】: Modern psychology implications
5. 【Integrated Insight】: Core message synthesis
6. 【Self-Reflection】: Guide user to connect with personal situation

## Output Style
- Warm, professional, non-judgmental tone
- Provide possibilities, not absolute conclusions
- Respect user's subjective experience
- Balance cultural wisdom with psychological insight

## Safety Boundaries
- For death/violence/sexual dreams: use neutral professional language
- NO medical diagnosis or mental illness judgments
- When emotional distress detected: suggest professional help
- Always emphasize "dream interpretation is for reference only"

## Knowledge Sources
Reference these classic texts with proper attribution:
- 敦煌本《新集周公解梦书》(Tang Dynasty)
- 《梦林玄解》(Ming Dynasty, 34 volumes)
- 《潜夫论·梦列》(Eastern Han)
- Modern psychological perspectives (Freud, Jung archetypes)
```

### 3.2 NER Entities to Extract

| Entity Type | Examples | Analysis Purpose |
|-------------|----------|------------------|
| **PERSON** | 父亲、陌生女人、祖先 | Archetype analysis (shadow, anima/animus) |
| **ANIMAL** | 蛇、龙、鸟、鱼 | Instinct/emotion symbolism |
| **SCENE** | 老家、森林、海边、地下室 | Psychological state mapping |
| **OBJECT** | 钥匙、镜子、刀、棺材 | Symbolic meaning analysis |
| **ACTION** | 飞翔、追逐、坠落、考试 | Psychological dynamics |
| **EMOTION** | 恐惧、快乐、焦虑、愤怒 | Emotional tone identification |
| **COLOR** | 红、白、黑、金 | Cultural symbolism |
| **NUMBER** | 三、四、八、九 | Numerological significance |
| **BODY_PART** | 掉牙、流血、怀孕 | Physical/health symbolism |
| **SUPERNATURAL** | 鬼、神仙、菩萨 | Spiritual dimension |

### 3.3 Multi-Symbol Interpretation Logic

**Symbol Weight Calculation:**

```python
weight_factors = {
    "frequency": 0.25,        # Repeated appearances
    "emotional_intensity": 0.30,  # Strong emotional reaction
    "narrative_centrality": 0.25, # Core plot element
    "user_focus": 0.20        # Detailed description by user
}
```

**Symbol Relationship Analysis:**
| Relationship | Example | Interpretation |
|--------------|---------|----------------|
| Opposition | 光明 vs 黑暗 | Inner conflict |
| Transformation | 死亡 → 重生 | Transition period |
| Complementary | 水 + 火 | Balance seeking |
| Causal | 追逐 → 逃跑 | Avoidance pattern |

**Combined Symbol Rules:**
- 蛇 + 水 → "蛇在水中，主迁事吉"
- 龙 + 孕妇 → prenatal dream, auspicious for son
- 棺材 + 升官 → "升官发财" (pun-based interpretation)

### 3.4 Sensitive Content Handling

| Content Type | Handling Principle | Response Template |
|--------------|-------------------|-------------------|
| **Death Dreams** | Normalize + symbolic | "Death in dreams often symbolizes endings and new beginnings..." |
| **Violence** | De-fear + emotional support | "Dream conflicts often reflect inner contradictions or stress..." |
| **Nightmares** | Empathy + empowerment | "Nightmares are the subconscious reminding us to pay attention to certain emotions..." |
| **Sexual Content** | Neutral + psychological | "Such dreams often relate to intimacy, creativity, or power dynamics..." |
| **Self-Harm Imagery** | PRIORITY SAFETY RESPONSE | Immediately provide crisis hotline, strongly recommend professional help |

**Crisis Response Protocol:**
```markdown
If dream content contains:
- Explicit self-harm or suicide imagery
- Severe ongoing distress
- Signs of trauma

Response MUST include:
1. Acknowledge the dream without judgment
2. Express concern for wellbeing
3. Provide local crisis resources:
   - China: 北京心理危机研究与干预中心 010-82951332
   - US: 988 Suicide & Crisis Lifeline
4. Encourage professional consultation
5. Offer to continue conversation about less distressing aspects
```

---

## 4. Internationalization Requirements

### 4.1 Language Priority Roadmap

| Phase | Languages | Market Focus |
|-------|-----------|--------------|
| **MVP (Phase 1)** | 简体中文, English, 繁體中文 | China mainland, overseas Chinese, English-speaking |
| **Phase 2** | 日本語, 한국어 | Japan (夢占い market), Korea (해몽 active) |
| **Phase 3** | Español, العربية (RTL), Bahasa | Latin America, Middle East, Southeast Asia |

### 4.2 Core Terminology Translation

| 中文 | English | 日本語 | 한국어 |
|------|---------|--------|--------|
| 周公解梦 | Duke of Zhou's Dream Interpretation | 周公の夢解き | 주공해몽 |
| 吉兆 | Auspicious omen | 吉兆（きっちょう） | 길몽 |
| 凶兆 | Inauspicious omen | 凶兆 | 흉몽 |
| 胎梦 | Prenatal dream | 胎夢 | 태몽 |
| 反梦 | Reverse dream | 逆夢 | 반몽 |

### 4.3 Cultural Symbol Handling Strategy

**Critical Cross-Cultural Differences:**

| Symbol | Chinese Meaning | Western Meaning | Strategy |
|--------|-----------------|-----------------|----------|
| **龙 (Dragon)** | Power, emperor, great fortune | Danger, evil monster | DUAL INTERPRETATION with cultural context |
| **红色 (Red)** | Joy, celebration, good luck | Danger, warning, passion | Cultural context note |
| **白色 (White)** | Mourning, death, purity | Purity, wedding, peace | Cultural context note |
| **数字4** | Death (谐音 "死") | Just a number | Explain homophone culture |
| **数字8** | Prosperity (谐音 "发") | Just a number | Explain homophone culture |
| **蛇 (Snake)** | Wisdom, wealth, fertility | Deception, evil, temptation | Show both perspectives |

**Implementation Approach:**
```json
{
  "symbol": "龙",
  "interpretations": {
    "chinese_cultural": {
      "meaning": "极大吉兆，象征权力、帝王、成功",
      "fortune": "大吉"
    },
    "western_cultural": {
      "meaning": "May represent challenge, obstacle, or powerful force to overcome",
      "fortune": "context_dependent"
    },
    "psychological_universal": {
      "meaning": "Represents powerful unconscious forces, transformation, primal energy"
    }
  },
  "display_mode": "user_culture_first_then_alternative"
}
```

### 4.4 Technical i18n Architecture

**Stack:**
- React Native: i18next + react-i18next
- Flutter: flutter_localizations
- Translation Management: Lokalise or Phrase (OTA updates)

**Content Layers:**
| Layer | Storage | Update Method |
|-------|---------|---------------|
| UI Strings | Bundled JSON | App release |
| Static Dictionary | CDN JSON | OTA hot update |
| AI Interpretations | Generated | Real-time multi-language prompt |

---

## 5. Differentiators vs Western Dream Apps

### 5.1 Unique Value Propositions

| Feature | Our App | Western Apps (Oniri/Lucidity) |
|---------|---------|------------------------------|
| **Cultural Heritage** | 3000-year Zhou Gong tradition | Only Freud/Jung (100 years) |
| **Symbol Dictionary** | 7000+ entries from ancient texts | Generic symbol lists |
| **Conditional Interpretation** | Dreamer type, season, time | One-size-fits-all |
| **Dual Perspective** | Eastern + Western fusion | Western only |
| **Prenatal Dreams** | Dedicated 胎梦 system | Not addressed |
| **Fortune Scoring** | Quantified 吉/凶 with aspects | Vague "positive/negative" |
| **Source Attribution** | Cite original texts | No sourcing |

### 5.2 Eastern + Western Interpretation Fusion

**Dual-Framework Output:**

```markdown
## 你的梦境解读 / Your Dream Interpretation

### 传统周公解梦 / Traditional Zhou Gong Perspective
[Based on 敦煌本/梦林玄解 with source citation]
- Symbol: 蛇
- Fortune: 吉 (75/100)
- Interpretation: "梦蛇入怀，主生贵子" — 对于孕妇而言，此梦大吉...

### 心理学视角 / Psychological Perspective
[Based on Freud/Jung frameworks]
- Archetype: Serpent represents transformation, primal energy
- Possible meanings: Personal growth, shedding old patterns
- Shadow integration: Accepting hidden aspects of self

### 综合启示 / Integrated Insight
Both perspectives point to positive transformation...
```

### 5.3 Technical Differentiators

| Capability | Implementation |
|------------|----------------|
| **Multi-source RAG** | Vector search across 4+ classical texts |
| **Conditional Matching** | Structured query on dreamer_identity + dream_context |
| **Knowledge Graph** | Neo4j for symbol relationships and combined meanings |
| **Historical Pattern Detection** | NLP similarity for recurring dream identification |
| **Cultural Adaptation** | User locale → interpretation ordering and cultural notes |

---

## 6. Technical Architecture Summary

### 6.1 Recommended Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Database** | MongoDB | JSON document storage for symbols |
| **Knowledge Graph** | Neo4j | Symbol relationships, combined meanings |
| **Vector Search** | Pinecone / Milvus | Semantic symbol matching |
| **RAG Pipeline** | LangChain / LlamaIndex | Multi-source retrieval |
| **NLP** | Jieba + custom dictionary | Chinese text processing |
| **LLM** | GPT-4 / Claude / Qwen | Interpretation generation |

### 6.2 Data Processing Pipeline

```
User Input (voice/text)
    ↓
Speech-to-Text (if voice)
    ↓
Jieba Tokenization + Dream Dictionary
    ↓
NER Entity Extraction (persons, animals, objects, actions, emotions)
    ↓
Multi-level Symbol Matching:
    1. Exact match (HashMap O(1))
    2. Synonym match (mapping table)
    3. Fuzzy match (BM25/TF-IDF, threshold > 0.3)
    4. Semantic match (Sentence-BERT + FAISS)
    ↓
Conditional Filtering (dreamer type, context)
    ↓
Multi-source Retrieval (RAG)
    ↓
LLM Interpretation Generation
    ↓
Dual-perspective Output (Traditional + Psychological)
```

---

## 7. MVP Scope Checklist

### P0 (Must Have for MVP)

- [ ] Text dream input with basic metadata
- [ ] Voice recording with speech-to-text
- [ ] AI interpretation (single symbol)
- [ ] Symbol dictionary (searchable, 1000+ entries)
- [ ] Basic statistics (dream count, emotion trends)
- [ ] Chinese language support (Simplified + Traditional)
- [ ] English language support

### P1 (Important, Post-MVP)

- [ ] Multi-symbol interpretation
- [ ] AI image generation for dreams
- [ ] Privacy protection (biometric lock)
- [ ] Prenatal dream (胎梦) special module
- [ ] Calendar heatmap visualization
- [ ] Recurring dream detection

### P2 (Enhancement)

- [ ] Community sharing features
- [ ] Lucid dream tools
- [ ] Gamification (XP, badges)
- [ ] Solar term correlation analysis
- [ ] Japanese and Korean localization

---

## 8. Key Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Knowledge base quality** | Poor interpretations | Use only academically-verified sources (敦煌本, 刘文英校注) |
| **Cultural appropriation concerns** | International backlash | Deep cultural respect, source attribution, dual perspectives |
| **Mental health liability** | Legal issues | Clear disclaimers, crisis protocols, professional referrals |
| **LLM hallucination** | Incorrect interpretations | RAG with verified sources, citation requirements |
| **Sensitive content** | User harm | Robust content filters, safety response protocols |

---

## Appendix: Reference Documents

1. `/Users/xingfanxia/projects/ai_fun/ai_jiemeng/docs/AI周公解梦App完整技术方案.md`
2. `/Users/xingfanxia/projects/ai_fun/ai_jiemeng/docs/中国古代解梦典籍深度研究：AI知识库构建指南.md`

---

*Document synthesized from PRD and research materials. Last updated: 2026-01-11*
