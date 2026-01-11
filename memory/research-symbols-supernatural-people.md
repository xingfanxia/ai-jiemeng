# Dream Symbol Research: Supernatural & People Categories

**Research Date**: 2026-01-11
**Sources**: Ancient texts (敦煌梦书, 梦林玄解, 周公解梦原版), academic research (刘文英, 郑炳林), Korean 태몽 traditions
**Purpose**: AI Dream Interpretation Knowledge Base

---

## Part 1: Supernatural/Ghost Symbols (鬼神类) - 35 Entries

### 1.1 Divine Beings (神灵类)

#### 1. 神仙 (Immortals/Deities)
```json
{
  "symbol_id": "sup_shenxian_001",
  "name": "神仙",
  "aliases": ["仙人", "神人", "天神"],
  "category": {"primary": "鬼神类", "secondary": "神灵"},
  "interpretations": [
    {
      "content": "梦见神仙，主有喜事，百事大吉",
      "fortune": {"type": "大吉", "score": 90},
      "conditions": {"dreamer_identity": ["general"]},
      "source": {"book_name": "梦林玄解", "dynasty": "明", "reliability": "原典"}
    },
    {
      "content": "梦神仙来召，主寿终，宜修行善事",
      "fortune": {"type": "凶", "score": 25},
      "conditions": {"dream_details": {"action": "被召唤"}},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    }
  ],
  "psychological_analysis": "神仙象征着超越世俗的智慧、内心对完美与永恒的追求",
  "related_symbols": ["佛", "菩萨", "道士"]
}
```

#### 2. 佛 (Buddha)
```json
{
  "symbol_id": "sup_fo_001",
  "name": "佛",
  "aliases": ["如来", "释迦", "佛祖", "佛陀"],
  "category": {"primary": "鬼神类", "secondary": "佛道"},
  "interpretations": [
    {
      "content": "梦见佛者，大吉，主有贵人相助",
      "fortune": {"type": "大吉", "score": 95},
      "conditions": {"dreamer_identity": ["general"]},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    },
    {
      "content": "梦拜佛，主有善缘，心愿可成",
      "fortune": {"type": "吉", "score": 85},
      "conditions": {"dream_details": {"action": "拜佛"}},
      "source": {"book_name": "周公解梦", "dynasty": "三国"}
    }
  ],
  "psychological_analysis": "佛象征着内心的觉醒、慈悲与智慧的最高境界"
}
```

#### 3. 菩萨 (Bodhisattva)
```json
{
  "symbol_id": "sup_pusa_001",
  "name": "菩萨",
  "aliases": ["观音", "观世音", "大士"],
  "category": {"primary": "鬼神类", "secondary": "佛道"},
  "interpretations": [
    {
      "content": "梦见菩萨者，主长寿，有福报",
      "fortune": {"type": "大吉", "score": 92},
      "conditions": {"dreamer_identity": ["general"]},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    },
    {
      "content": "孕妇梦见观音，主得贵子，母子平安",
      "fortune": {"type": "大吉", "score": 95},
      "conditions": {"dreamer_identity": ["孕妇"]},
      "source": {"book_name": "民间传说", "reliability": "民间"}
    }
  ],
  "psychological_analysis": "菩萨象征着慈悲、救度、内心对庇护与指引的渴望"
}
```

#### 4. 玉皇大帝 (Jade Emperor)
```json
{
  "symbol_id": "sup_yuhuang_001",
  "name": "玉皇大帝",
  "aliases": ["玉帝", "天帝", "昊天上帝"],
  "interpretations": [
    {
      "content": "梦见玉帝，主大富大贵，事业亨通",
      "fortune": {"type": "大吉", "score": 95},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    }
  ]
}
```

#### 5. 王母娘娘 (Queen Mother of the West)
```json
{
  "symbol_id": "sup_wangmu_001",
  "name": "王母娘娘",
  "aliases": ["西王母", "瑶池金母"],
  "interpretations": [
    {
      "content": "女子梦见王母，主婚姻美满，多子多福",
      "fortune": {"type": "大吉", "score": 88},
      "conditions": {"dreamer_identity": ["女"]},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 6. 财神 (God of Wealth)
```json
{
  "symbol_id": "sup_caishen_001",
  "name": "财神",
  "aliases": ["赵公明", "关公", "文财神", "武财神"],
  "interpretations": [
    {
      "content": "梦见财神，主近期财运亨通，生意兴隆",
      "fortune": {"type": "大吉", "score": 90, "aspects": {"wealth": "大吉"}},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 7. 土地公 (Earth God)
```json
{
  "symbol_id": "sup_tudi_001",
  "name": "土地公",
  "aliases": ["土地神", "土地爷", "福德正神"],
  "interpretations": [
    {
      "content": "梦见土地公，主家宅平安，近有小财",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 8. 门神 (Door Gods)
```json
{
  "symbol_id": "sup_menshen_001",
  "name": "门神",
  "aliases": ["秦琼", "尉迟恭"],
  "interpretations": [
    {
      "content": "梦见门神，主有贵人护佑，小人远避",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 9. 灶神 (Kitchen God)
```json
{
  "symbol_id": "sup_zaoshen_001",
  "name": "灶神",
  "aliases": ["灶王爷", "灶君"],
  "interpretations": [
    {
      "content": "梦见灶神，主家庭和睦，衣食无忧",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

### 1.2 Religious Figures (宗教人物)

#### 10. 道士 (Taoist Priest)
```json
{
  "symbol_id": "sup_daoshi_001",
  "name": "道士",
  "aliases": ["道人", "真人", "道长"],
  "interpretations": [
    {
      "content": "梦见道士，主得贵人指点，事业顺遂",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    },
    {
      "content": "梦道士授符，主避灾免祸",
      "fortune": {"type": "吉", "score": 82},
      "conditions": {"dream_details": {"action": "授符"}},
      "source": {"book_name": "梦林玄解"}
    }
  ]
}
```

#### 11. 和尚 (Buddhist Monk)
```json
{
  "symbol_id": "sup_heshang_001",
  "name": "和尚",
  "aliases": ["僧人", "比丘", "出家人", "师父"],
  "interpretations": [
    {
      "content": "梦见和尚，主心境清净，有善缘",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "梦林玄解", "dynasty": "明"}
    },
    {
      "content": "梦和尚念经，主消灾解难",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 12. 尼姑 (Buddhist Nun)
```json
{
  "symbol_id": "sup_nigu_001",
  "name": "尼姑",
  "aliases": ["比丘尼", "出家女"],
  "interpretations": [
    {
      "content": "女子梦见尼姑，主心事难了，宜静心修养",
      "fortune": {"type": "中平", "score": 55},
      "conditions": {"dreamer_identity": ["女"]},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 13. 天使 (Angel)
```json
{
  "symbol_id": "sup_tianshi_001",
  "name": "天使",
  "aliases": ["安琪儿"],
  "interpretations": [
    {
      "content": "梦见天使，主有好消息，心愿可成",
      "fortune": {"type": "吉", "score": 82},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "天使象征纯洁、指引与内心的善良本性",
  "cultural_note": "西方宗教符号，中国传统梦书无此条目"
}
```

#### 14. 恶魔 (Demon)
```json
{
  "symbol_id": "sup_emo_001",
  "name": "恶魔",
  "aliases": ["撒旦", "魔鬼"],
  "interpretations": [
    {
      "content": "梦见恶魔，主内心有恐惧或罪疚感，宜反省",
      "fortune": {"type": "凶", "score": 30},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "恶魔象征内心的阴暗面、被压抑的欲望或恐惧",
  "cultural_note": "西方宗教符号"
}
```

### 1.3 Ghosts & Spirits (鬼魂类)

#### 15. 鬼 (Ghost)
```json
{
  "symbol_id": "sup_gui_001",
  "name": "鬼",
  "aliases": ["鬼魂", "幽灵", "亡魂"],
  "category": {"primary": "鬼神类", "secondary": "鬼怪"},
  "interpretations": [
    {
      "content": "梦见鬼，主有忧愁之事，宜小心谨慎",
      "fortune": {"type": "凶", "score": 35},
      "conditions": {"dreamer_identity": ["general"]},
      "source": {"book_name": "周公解梦", "dynasty": "三国", "original_text": "梦鬼者忧患也"}
    },
    {
      "content": "梦鬼在院内，忧愁散",
      "fortune": {"type": "吉", "score": 65},
      "conditions": {"dream_details": {"location": "院内"}},
      "source": {"book_name": "敦煌梦书", "dynasty": "唐"}
    },
    {
      "content": "梦杀鬼者，大吉，可避灾祸",
      "fortune": {"type": "大吉", "score": 85},
      "conditions": {"dream_details": {"action": "杀鬼"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "鬼象征被压抑的情感、未解决的心理问题或对死亡的恐惧"
}
```

#### 16. 死去的亲人 (Deceased Relatives)
```json
{
  "symbol_id": "sup_deceased_relative_001",
  "name": "死去的亲人",
  "aliases": ["已故亲人", "去世的亲人", "亡故亲人"],
  "interpretations": [
    {
      "content": "梦见死去的亲人，吉兆，会有好消息传来",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦", "original_text": "亲友死，其必寿延"}
    },
    {
      "content": "梦与死去亲人交谈，会扬名四海",
      "fortune": {"type": "吉", "score": 78},
      "conditions": {"dream_details": {"action": "交谈"}},
      "source": {"book_name": "梦林玄解"}
    },
    {
      "content": "梦与已故亲人进餐，会长寿",
      "fortune": {"type": "大吉", "score": 85},
      "conditions": {"dream_details": {"action": "进餐"}},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦呼喊死人名字，不吉，宜注意健康",
      "fortune": {"type": "凶", "score": 25},
      "conditions": {"dream_details": {"action": "呼喊名字"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "代表对逝者的思念、未完成的心愿或内心深处的情感连接"
}
```

#### 17. 被鬼追 (Chased by Ghost)
```json
{
  "symbol_id": "sup_ghost_chase_001",
  "name": "被鬼追",
  "aliases": ["鬼追人", "被鬼追赶"],
  "interpretations": [
    {
      "content": "梦见被鬼追，主近期压力大，有焦虑之事",
      "fortune": {"type": "凶", "score": 35},
      "source": {"book_name": "现代解梦"}
    },
    {
      "content": "梦被鬼追而逃脱，主能化险为夷",
      "fortune": {"type": "中平", "score": 55},
      "conditions": {"dream_details": {"outcome": "逃脱"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "被追赶象征着逃避现实问题或内心恐惧，鬼代表难以面对的事物"
}
```

#### 18. 鬼压床 (Sleep Paralysis / Ghost Pressing)
```json
{
  "symbol_id": "sup_ghost_press_001",
  "name": "鬼压床",
  "aliases": ["梦魇", "鬼压身", "睡眠瘫痪"],
  "interpretations": [
    {
      "content": "梦见鬼压床，主生活中有压力或隐患",
      "fortune": {"type": "凶", "score": 40},
      "source": {"book_name": "民间传说"}
    },
    {
      "content": "频繁鬼压床，宜调整作息，注意身体健康",
      "fortune": {"type": "警示", "score": 45},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "medical_note": "医学上称睡眠瘫痪症，发生于REM睡眠期，意识清醒但肌肉暂时无法动弹",
  "psychological_analysis": "可能反映生活压力、人际关系紧张或内心不安"
}
```

#### 19. 与鬼说话 (Talking to Ghost)
```json
{
  "symbol_id": "sup_ghost_talk_001",
  "name": "与鬼说话",
  "aliases": ["和鬼交谈", "与鬼对话"],
  "interpretations": [
    {
      "content": "梦与鬼说话，主有小愿望可达成",
      "fortune": {"type": "中平", "score": 58},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦中鬼哭泣，则诸事不顺",
      "fortune": {"type": "凶", "score": 35},
      "conditions": {"dream_details": {"state": "哭泣"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 20. 祖先 (Ancestors)
```json
{
  "symbol_id": "sup_zuxian_001",
  "name": "祖先",
  "aliases": ["先人", "列祖列宗", "祖宗"],
  "interpretations": [
    {
      "content": "梦见祖先，主家运兴旺，有贵人护佑",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "梦林玄解"}
    },
    {
      "content": "梦祖先训示，宜听从教诲，行善积德",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dream_details": {"action": "训示"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 21. 亡灵 (Spirit of the Dead)
```json
{
  "symbol_id": "sup_wangling_001",
  "name": "亡灵",
  "aliases": ["死者灵魂", "幽魂"],
  "interpretations": [
    {
      "content": "梦见亡灵，可能有未了心愿需完成",
      "fortune": {"type": "中平", "score": 50},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

### 1.4 Monsters & Supernatural Creatures (妖怪类)

#### 22. 僵尸 (Jiangshi/Zombie)
```json
{
  "symbol_id": "sup_jiangshi_001",
  "name": "僵尸",
  "aliases": ["活死人", "不死人"],
  "interpretations": [
    {
      "content": "梦见僵尸，主有困难阻碍，需小心应对",
      "fortune": {"type": "凶", "score": 35},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "僵尸象征失去活力、机械化的生活状态或对死亡的恐惧"
}
```

#### 23. 吸血鬼 (Vampire)
```json
{
  "symbol_id": "sup_xixuegui_001",
  "name": "吸血鬼",
  "aliases": ["血族"],
  "interpretations": [
    {
      "content": "梦见吸血鬼，主身边有消耗精力之人或事",
      "fortune": {"type": "凶", "score": 38},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "象征着生命能量被剥夺、情感上的依附或被控制感",
  "cultural_note": "西方文化符号，中国传统无此概念"
}
```

#### 24. 妖怪 (Monster/Demon)
```json
{
  "symbol_id": "sup_yaoguai_001",
  "name": "妖怪",
  "aliases": ["妖精", "妖魔"],
  "interpretations": [
    {
      "content": "梦见妖怪，主有小人作祟，宜提防",
      "fortune": {"type": "凶", "score": 40},
      "source": {"book_name": "梦林玄解"}
    },
    {
      "content": "梦降服妖怪，主克服困难，化险为夷",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dream_details": {"action": "降服"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 25. 狐仙 (Fox Spirit)
```json
{
  "symbol_id": "sup_huxian_001",
  "name": "狐仙",
  "aliases": ["狐狸精", "九尾狐", "狐妖"],
  "interpretations": [
    {
      "content": "男子梦见狐仙，主有艳遇或桃花运",
      "fortune": {"type": "中平", "score": 55},
      "conditions": {"dreamer_identity": ["男"]},
      "source": {"book_name": "民间传说"}
    },
    {
      "content": "女子梦见狐仙，主有情敌出现，宜小心",
      "fortune": {"type": "凶", "score": 40},
      "conditions": {"dreamer_identity": ["女"]},
      "source": {"book_name": "民间传说"}
    }
  ],
  "cultural_note": "狐仙在中国民间信仰中地位特殊，亦正亦邪"
}
```

#### 26. 黄鼠狼精 (Weasel Spirit)
```json
{
  "symbol_id": "sup_huangshulang_001",
  "name": "黄鼠狼精",
  "aliases": ["黄大仙", "黄皮子"],
  "interpretations": [
    {
      "content": "梦见黄鼠狼精，主有小人暗算",
      "fortune": {"type": "凶", "score": 38},
      "source": {"book_name": "民间传说"}
    }
  ],
  "cultural_note": "东北民间信仰中的五大家仙之一"
}
```

#### 27. 蛇精 (Snake Spirit)
```json
{
  "symbol_id": "sup_shejing_001",
  "name": "蛇精",
  "aliases": ["蛇妖", "白蛇"],
  "interpretations": [
    {
      "content": "梦见蛇精，主有隐患或小人",
      "fortune": {"type": "凶", "score": 42},
      "source": {"book_name": "民间传说"}
    },
    {
      "content": "梦见白蛇化人，主遇贵人",
      "fortune": {"type": "吉", "score": 70},
      "conditions": {"dream_details": {"color": "白", "action": "化人"}},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 28. 龙王 (Dragon King)
```json
{
  "symbol_id": "sup_longwang_001",
  "name": "龙王",
  "aliases": ["四海龙王", "东海龙王"],
  "interpretations": [
    {
      "content": "梦见龙王，主大贵，事业腾飞",
      "fortune": {"type": "大吉", "score": 92},
      "source": {"book_name": "梦林玄解"}
    }
  ]
}
```

#### 29. 阎王 (King of Hell)
```json
{
  "symbol_id": "sup_yanwang_001",
  "name": "阎王",
  "aliases": ["阎罗王", "阎罗", "地狱判官"],
  "interpretations": [
    {
      "content": "梦见阎王，主有大事发生，宜谨慎",
      "fortune": {"type": "凶", "score": 30},
      "source": {"book_name": "民间传说"}
    },
    {
      "content": "梦被阎王赦免，主大难不死必有后福",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dream_details": {"action": "被赦免"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 30. 判官 (Judge of Hell)
```json
{
  "symbol_id": "sup_panguan_001",
  "name": "判官",
  "aliases": ["地府判官", "崔判官"],
  "interpretations": [
    {
      "content": "梦见判官，主有是非曲直需分辨",
      "fortune": {"type": "中平", "score": 50},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 31. 牛头马面 (Ox-Head and Horse-Face)
```json
{
  "symbol_id": "sup_niutoumamian_001",
  "name": "牛头马面",
  "aliases": ["地狱差役"],
  "interpretations": [
    {
      "content": "梦见牛头马面，主有惊险之事，但可化解",
      "fortune": {"type": "凶", "score": 40},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 32. 黑白无常 (Black and White Impermanence)
```json
{
  "symbol_id": "sup_heibai_wuchang_001",
  "name": "黑白无常",
  "aliases": ["无常鬼", "七爷八爷"],
  "interpretations": [
    {
      "content": "梦见黑白无常，主有变故，宜多行善事",
      "fortune": {"type": "凶", "score": 35},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 33. 小鬼 (Little Ghost/Imp)
```json
{
  "symbol_id": "sup_xiaogui_001",
  "name": "小鬼",
  "aliases": ["鬼仔", "小妖"],
  "interpretations": [
    {
      "content": "梦见小鬼，主有小麻烦，但不足为虑",
      "fortune": {"type": "小凶", "score": 45},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 34. 钟馗 (Zhong Kui - Ghost Catcher)
```json
{
  "symbol_id": "sup_zhongkui_001",
  "name": "钟馗",
  "aliases": ["捉鬼大师", "驱鬼之神"],
  "interpretations": [
    {
      "content": "梦见钟馗，主小人退散，正气得伸",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 35. 八仙 (Eight Immortals)
```json
{
  "symbol_id": "sup_baxian_001",
  "name": "八仙",
  "aliases": ["吕洞宾", "铁拐李", "何仙姑", "蓝采和", "张果老", "汉钟离", "韩湘子", "曹国舅"],
  "interpretations": [
    {
      "content": "梦见八仙，大吉，主福寿绑来，万事如意",
      "fortune": {"type": "大吉", "score": 90},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

---

## Part 2: People Symbols (人物类) - 45 Entries

### 2.1 Family Members (家庭成员)

#### 1. 父亲 (Father)
```json
{
  "symbol_id": "ppl_father_001",
  "name": "父亲",
  "aliases": ["爸爸", "爹", "父"],
  "category": {"primary": "人物类", "secondary": "家庭成员"},
  "interpretations": [
    {
      "content": "梦见父亲，主有贵人提携，事业顺遂",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见父亲去世，大吉，预示长寿健康（反梦）",
      "fortune": {"type": "吉", "score": 70},
      "source": {"book_name": "梦林玄解", "original_text": "梦父母亡，大吉"}
    },
    {
      "content": "梦见与父亲争吵，主家庭关系需调和",
      "fortune": {"type": "中平", "score": 50},
      "conditions": {"dream_details": {"action": "争吵"}},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "父亲象征权威、保护、规则与责任"
}
```

#### 2. 母亲 (Mother)
```json
{
  "symbol_id": "ppl_mother_001",
  "name": "母亲",
  "aliases": ["妈妈", "娘", "母"],
  "interpretations": [
    {
      "content": "梦见母亲，主有喜事，家庭和睦",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见母亲去世，告诫不要被朋友引入歧途",
      "fortune": {"type": "警示", "score": 55},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "母亲象征关爱、滋养、情感依托与安全感"
}
```

#### 3. 祖父 (Grandfather)
```json
{
  "symbol_id": "ppl_grandfather_001",
  "name": "祖父",
  "aliases": ["爷爷", "祖父", "外公"],
  "interpretations": [
    {
      "content": "梦见祖父，主得长辈庇佑，福泽绵长",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征智慧、传统与家族传承"
}
```

#### 4. 祖母 (Grandmother)
```json
{
  "symbol_id": "ppl_grandmother_001",
  "name": "祖母",
  "aliases": ["奶奶", "外婆", "姥姥"],
  "interpretations": [
    {
      "content": "梦见祖母，主家庭温馨，生活安康",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征慈爱、家庭温暖与精神慰藉"
}
```

#### 5. 兄弟 (Brother)
```json
{
  "symbol_id": "ppl_brother_001",
  "name": "兄弟",
  "aliases": ["哥哥", "弟弟", "兄长"],
  "interpretations": [
    {
      "content": "梦见兄弟，主手足情深，有人相助",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见兄弟相打，和合（反梦）",
      "fortune": {"type": "吉", "score": 68},
      "conditions": {"dream_details": {"action": "打架"}},
      "source": {"book_name": "敦煌梦书", "dynasty": "唐"}
    }
  ]
}
```

#### 6. 姐妹 (Sister)
```json
{
  "symbol_id": "ppl_sister_001",
  "name": "姐妹",
  "aliases": ["姐姐", "妹妹"],
  "interpretations": [
    {
      "content": "梦见姐妹，主家庭和睦，有贵人相助",
      "fortune": {"type": "吉", "score": 70},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 7. 儿子 (Son)
```json
{
  "symbol_id": "ppl_son_001",
  "name": "儿子",
  "aliases": ["孩子", "男孩"],
  "interpretations": [
    {
      "content": "梦见儿子，主家业兴旺，后继有人",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见儿子生病，宜多关心子女健康",
      "fortune": {"type": "警示", "score": 50},
      "conditions": {"dream_details": {"state": "生病"}},
      "source": {"book_name": "现代解梦"}
    }
  ]
}
```

#### 8. 女儿 (Daughter)
```json
{
  "symbol_id": "ppl_daughter_001",
  "name": "女儿",
  "aliases": ["千金", "闺女"],
  "interpretations": [
    {
      "content": "梦见女儿，主心愿可成，家庭美满",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 9. 丈夫 (Husband)
```json
{
  "symbol_id": "ppl_husband_001",
  "name": "丈夫",
  "aliases": ["老公", "夫君", "郎君"],
  "interpretations": [
    {
      "content": "女子梦见丈夫，主夫妻恩爱，家庭和睦",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dreamer_identity": ["女", "已婚"]},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 10. 妻子 (Wife)
```json
{
  "symbol_id": "ppl_wife_001",
  "name": "妻子",
  "aliases": ["老婆", "夫人", "娘子", "太太"],
  "interpretations": [
    {
      "content": "男子梦见妻子，主家庭美满，夫妻和顺",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dreamer_identity": ["男", "已婚"]},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 11. 公公婆婆 (Parents-in-law)
```json
{
  "symbol_id": "ppl_inlaws_001",
  "name": "公公婆婆",
  "aliases": ["岳父岳母", "翁姑"],
  "interpretations": [
    {
      "content": "梦见公婆，主家庭关系需维护",
      "fortune": {"type": "中平", "score": 55},
      "source": {"book_name": "现代解梦"}
    }
  ]
}
```

#### 12. 叔叔伯伯 (Uncles)
```json
{
  "symbol_id": "ppl_uncle_001",
  "name": "叔叔伯伯",
  "aliases": ["舅舅", "姨父"],
  "interpretations": [
    {
      "content": "梦见叔伯，主有长辈关照，贵人相助",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

### 2.2 Social Relations (社会关系)

#### 13. 朋友 (Friend)
```json
{
  "symbol_id": "ppl_friend_001",
  "name": "朋友",
  "aliases": ["友人", "挚友", "好友"],
  "interpretations": [
    {
      "content": "梦见朋友，主人际关系良好，有贵人帮助",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见与朋友争吵，反主关系加深",
      "fortune": {"type": "吉", "score": 65},
      "conditions": {"dream_details": {"action": "争吵"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 14. 同事 (Colleague)
```json
{
  "symbol_id": "ppl_colleague_001",
  "name": "同事",
  "aliases": ["同僚", "工作伙伴"],
  "interpretations": [
    {
      "content": "梦见同事，主工作顺利，团队合作良好",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "现代解梦"}
    }
  ]
}
```

#### 15. 老板 (Boss)
```json
{
  "symbol_id": "ppl_boss_001",
  "name": "老板",
  "aliases": ["上司", "领导", "主管"],
  "interpretations": [
    {
      "content": "梦见老板，主事业有变化，需谨慎应对",
      "fortune": {"type": "中平", "score": 55},
      "source": {"book_name": "现代解梦"}
    },
    {
      "content": "梦见被老板表扬，主升职加薪",
      "fortune": {"type": "吉", "score": 78},
      "conditions": {"dream_details": {"action": "表扬"}},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "老板象征权威、事业压力与自我价值认同"
}
```

#### 16. 老师 (Teacher)
```json
{
  "symbol_id": "ppl_teacher_001",
  "name": "老师",
  "aliases": ["先生", "师傅", "导师"],
  "interpretations": [
    {
      "content": "梦见老师，主有人指点迷津，学业进步",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征知识、指导与内心对成长的渴望"
}
```

#### 17. 医生 (Doctor)
```json
{
  "symbol_id": "ppl_doctor_001",
  "name": "医生",
  "aliases": ["大夫", "郎中"],
  "interpretations": [
    {
      "content": "梦见医生，主身体有恙，宜注意健康",
      "fortune": {"type": "警示", "score": 50},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见医生治好病，主病患痊愈",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dream_details": {"action": "治愈"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 18. 警察 (Police)
```json
{
  "symbol_id": "ppl_police_001",
  "name": "警察",
  "aliases": ["公安", "巡警", "捕快"],
  "interpretations": [
    {
      "content": "梦见警察，主有是非官司，宜守法行事",
      "fortune": {"type": "警示", "score": 48},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "象征规则、约束与内心的道德准则"
}
```

#### 19. 陌生人 (Stranger)
```json
{
  "symbol_id": "ppl_stranger_001",
  "name": "陌生人",
  "aliases": ["生人", "不认识的人"],
  "interpretations": [
    {
      "content": "梦见陌生人，主有新的机遇或挑战",
      "fortune": {"type": "中平", "score": 55},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见陌生人帮助自己，主贵人将至",
      "fortune": {"type": "吉", "score": 72},
      "conditions": {"dream_details": {"action": "帮助"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "陌生人可能代表自我的未知面向或潜在的可能性"
}
```

#### 20. 小偷 (Thief)
```json
{
  "symbol_id": "ppl_thief_001",
  "name": "小偷",
  "aliases": ["盗贼", "窃贼"],
  "interpretations": [
    {
      "content": "梦见小偷，主有意外之财",
      "fortune": {"type": "吉", "score": 65},
      "source": {"book_name": "周公解梦", "original_text": "见盗匪，主生意兴"}
    },
    {
      "content": "梦见被小偷偷窃，主有损失，宜小心",
      "fortune": {"type": "凶", "score": 40},
      "conditions": {"dream_details": {"action": "被偷"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 21. 乞丐 (Beggar)
```json
{
  "symbol_id": "ppl_beggar_001",
  "name": "乞丐",
  "aliases": ["叫花子", "要饭的"],
  "interpretations": [
    {
      "content": "梦见乞丐，主有贵人相助（反梦）",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 22. 皇帝 (Emperor)
```json
{
  "symbol_id": "ppl_emperor_001",
  "name": "皇帝",
  "aliases": ["帝王", "天子", "君王"],
  "interpretations": [
    {
      "content": "梦见皇帝，主大富大贵，事业亨通",
      "fortune": {"type": "大吉", "score": 90},
      "source": {"book_name": "梦林玄解"}
    },
    {
      "content": "梦被皇帝召见，主有喜事临门",
      "fortune": {"type": "大吉", "score": 88},
      "conditions": {"dream_details": {"action": "召见"}},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 23. 官员 (Official)
```json
{
  "symbol_id": "ppl_official_001",
  "name": "官员",
  "aliases": ["官吏", "大人", "长官"],
  "interpretations": [
    {
      "content": "梦见官员，主有升迁之机",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 24. 士兵 (Soldier)
```json
{
  "symbol_id": "ppl_soldier_001",
  "name": "士兵",
  "aliases": ["军人", "兵士"],
  "interpretations": [
    {
      "content": "梦见士兵，主有保护，安全无虞",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 25. 商人 (Merchant)
```json
{
  "symbol_id": "ppl_merchant_001",
  "name": "商人",
  "aliases": ["生意人", "买卖人"],
  "interpretations": [
    {
      "content": "梦见商人，主有财运，生意兴隆",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

### 2.3 Special Status People (特殊身份)

#### 26. 婴儿 (Baby)
```json
{
  "symbol_id": "ppl_baby_001",
  "name": "婴儿",
  "aliases": ["宝宝", "新生儿", "娃娃"],
  "interpretations": [
    {
      "content": "梦见婴儿，主有新的开始，希望诞生",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "周公解梦"}
    },
    {
      "content": "梦见婴儿啼哭，主有小麻烦需处理",
      "fortune": {"type": "中平", "score": 52},
      "conditions": {"dream_details": {"state": "啼哭"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "婴儿象征新生、纯真、潜力与内心的脆弱面"
}
```

#### 27. 小孩 (Child)
```json
{
  "symbol_id": "ppl_child_001",
  "name": "小孩",
  "aliases": ["儿童", "孩童", "小朋友"],
  "interpretations": [
    {
      "content": "梦见小孩玩耍，主心情愉快，生活轻松",
      "fortune": {"type": "吉", "score": 75},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征内心的童真、无忧无虑的渴望"
}
```

#### 28. 老人 (Elderly)
```json
{
  "symbol_id": "ppl_elderly_001",
  "name": "老人",
  "aliases": ["老者", "长者", "老翁"],
  "interpretations": [
    {
      "content": "梦见老人，主得智慧指引，有贵人相助",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "梦林玄解"}
    },
    {
      "content": "梦见陌生老人授物，主有福气降临",
      "fortune": {"type": "大吉", "score": 85},
      "conditions": {"dream_details": {"action": "授物"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "老人象征智慧、经验与内心的指导者"
}
```

#### 29. 孕妇 (Pregnant Woman)
```json
{
  "symbol_id": "ppl_pregnant_001",
  "name": "孕妇",
  "aliases": ["怀孕的女人"],
  "interpretations": [
    {
      "content": "梦见孕妇，主有新事物诞生，计划可成",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征创造力、孕育新想法或项目"
}
```

#### 30. 死人 (Dead Person)
```json
{
  "symbol_id": "ppl_dead_001",
  "name": "死人",
  "aliases": ["亡者", "逝者"],
  "interpretations": [
    {
      "content": "梦见死人，主长命（反梦）",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "敦煌梦书", "dynasty": "唐", "original_text": "梦见身死，主长命"}
    },
    {
      "content": "梦见死人复活，主有旧事重提",
      "fortune": {"type": "中平", "score": 55},
      "conditions": {"dream_details": {"action": "复活"}},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "死人象征结束与新开始、告别过去"
}
```

#### 31. 尸体 (Corpse)
```json
{
  "symbol_id": "ppl_corpse_001",
  "name": "尸体",
  "aliases": ["死尸", "遗体"],
  "interpretations": [
    {
      "content": "梦见尸体，主有发财之机",
      "fortune": {"type": "吉", "score": 65},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 32. 新郎新娘 (Bride and Groom)
```json
{
  "symbol_id": "ppl_bridal_001",
  "name": "新郎新娘",
  "aliases": ["新人", "新婚夫妇"],
  "interpretations": [
    {
      "content": "梦见新婚，主有喜事，好事将近",
      "fortune": {"type": "吉", "score": 80},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 33. 情人 (Lover)
```json
{
  "symbol_id": "ppl_lover_001",
  "name": "情人",
  "aliases": ["恋人", "爱人"],
  "interpretations": [
    {
      "content": "梦见情人，主感情顺利，心愿可成",
      "fortune": {"type": "吉", "score": 75},
      "conditions": {"dreamer_identity": ["未婚"]},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 34. 前任 (Ex-partner)
```json
{
  "symbol_id": "ppl_ex_001",
  "name": "前任",
  "aliases": ["前男友", "前女友", "前夫", "前妻"],
  "interpretations": [
    {
      "content": "梦见前任，主对过去有所牵挂，宜放下",
      "fortune": {"type": "中平", "score": 50},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "象征未完成的情感、对过去的留恋或反思"
}
```

#### 35. 名人 (Celebrity)
```json
{
  "symbol_id": "ppl_celebrity_001",
  "name": "名人",
  "aliases": ["明星", "伟人"],
  "interpretations": [
    {
      "content": "梦见名人，主有出人头地之志",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "现代解梦"}
    }
  ],
  "psychological_analysis": "象征对成功、认可与社会地位的渴望"
}
```

#### 36. 双胞胎 (Twins)
```json
{
  "symbol_id": "ppl_twins_001",
  "name": "双胞胎",
  "aliases": ["孪生"],
  "interpretations": [
    {
      "content": "梦见双胞胎，主有双喜临门",
      "fortune": {"type": "大吉", "score": 85},
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### 37. 厨师 (Chef)
```json
{
  "symbol_id": "ppl_chef_001",
  "name": "厨师",
  "aliases": ["大厨", "庖丁"],
  "interpretations": [
    {
      "content": "梦见厨师，主衣食无忧，生活富足",
      "fortune": {"type": "吉", "score": 70},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 38. 护士 (Nurse)
```json
{
  "symbol_id": "ppl_nurse_001",
  "name": "护士",
  "aliases": ["白衣天使"],
  "interpretations": [
    {
      "content": "梦见护士，主有人关心照顾",
      "fortune": {"type": "吉", "score": 68},
      "source": {"book_name": "现代解梦"}
    }
  ]
}
```

#### 39. 法官 (Judge)
```json
{
  "symbol_id": "ppl_judge_001",
  "name": "法官",
  "aliases": ["判官", "青天"],
  "interpretations": [
    {
      "content": "梦见法官，主有是非需判断，宜秉公处事",
      "fortune": {"type": "中平", "score": 55},
      "source": {"book_name": "现代解梦"}
    }
  ]
}
```

#### 40. 邻居 (Neighbor)
```json
{
  "symbol_id": "ppl_neighbor_001",
  "name": "邻居",
  "aliases": ["街坊"],
  "interpretations": [
    {
      "content": "梦见邻居，主人际关系需注意",
      "fortune": {"type": "中平", "score": 55},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 41. 客人 (Guest)
```json
{
  "symbol_id": "ppl_guest_001",
  "name": "客人",
  "aliases": ["宾客", "来客"],
  "interpretations": [
    {
      "content": "梦见客人到访，主有喜事或好消息",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 42. 仆人 (Servant)
```json
{
  "symbol_id": "ppl_servant_001",
  "name": "仆人",
  "aliases": ["下人", "佣人"],
  "interpretations": [
    {
      "content": "梦见仆人，主有人愿意帮助",
      "fortune": {"type": "吉", "score": 65},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 43. 囚犯 (Prisoner)
```json
{
  "symbol_id": "ppl_prisoner_001",
  "name": "囚犯",
  "aliases": ["犯人", "罪犯"],
  "interpretations": [
    {
      "content": "梦见囚犯，主有束缚之感，宜寻求突破",
      "fortune": {"type": "中平", "score": 48},
      "source": {"book_name": "周公解梦"}
    }
  ],
  "psychological_analysis": "象征内心的束缚、罪疚感或限制"
}
```

#### 44. 农夫 (Farmer)
```json
{
  "symbol_id": "ppl_farmer_001",
  "name": "农夫",
  "aliases": ["农民", "庄稼人"],
  "interpretations": [
    {
      "content": "梦见农夫，主勤劳致富，收获在望",
      "fortune": {"type": "吉", "score": 72},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

#### 45. 渔夫 (Fisherman)
```json
{
  "symbol_id": "ppl_fisherman_001",
  "name": "渔夫",
  "aliases": ["渔民", "打鱼人"],
  "interpretations": [
    {
      "content": "梦见渔夫，主有意外收获",
      "fortune": {"type": "吉", "score": 70},
      "source": {"book_name": "周公解梦"}
    }
  ]
}
```

---

## Part 3: Prenatal Dreams (胎梦) - Special Section

### 3.1 Overview of Prenatal Dream Traditions

Prenatal dreams (胎梦/태몽/胎夢) are dreams believed to foretell conception, pregnancy, or the characteristics of an unborn child. This tradition is especially strong in East Asian cultures.

**Definition**: Dreams that occur before, during, or relating to pregnancy, believed to provide omens about the child's gender, fortune, or future.

### 3.2 Chinese Prenatal Dream Symbols

#### Symbols Predicting a Boy (生男征兆)

##### 1. 孕妇梦见龙 (Dragon)
```json
{
  "symbol_id": "prenatal_dragon_001",
  "name": "孕妇梦见龙",
  "category": {"primary": "胎梦", "secondary": "生男"},
  "interpretations": [
    {
      "content": "孕妇梦见龙，主生贵子，将来成大器",
      "fortune": {"type": "大吉", "score": 95},
      "source": {"book_name": "梦林玄解", "original_text": "妇人见龙生贵子"},
      "gender_prediction": "male"
    },
    {
      "content": "梦见龙升天，将来儿子能成顶天立地的大丈夫",
      "fortune": {"type": "大吉", "score": 95},
      "conditions": {"dream_details": {"action": "升天"}},
      "gender_prediction": "male"
    },
    {
      "content": "梦见龙入怀，暗示生下的儿子将来名声远扬",
      "fortune": {"type": "大吉", "score": 92},
      "conditions": {"dream_details": {"action": "入怀"}},
      "gender_prediction": "male"
    },
    {
      "content": "梦见龙头有角或口衔龙珠，预示是俊俏的儿子",
      "fortune": {"type": "大吉", "score": 90},
      "gender_prediction": "male"
    }
  ],
  "cultural_note": "龙在东亚文化中象征权力、尊贵与成功"
}
```

##### 2. 孕妇梦见蛇 (Snake)
```json
{
  "symbol_id": "prenatal_snake_001",
  "name": "孕妇梦见蛇",
  "category": {"primary": "胎梦", "secondary": "生男"},
  "interpretations": [
    {
      "content": "孕妇梦见蛇，主生儿子",
      "fortune": {"type": "吉", "score": 82},
      "source": {"book_name": "周公解梦", "original_text": "妇人见蛇入怀，主生贵子"},
      "gender_prediction": "male"
    },
    {
      "content": "梦见大蟒蛇或蟒蛇缠身，生儿子的征兆",
      "fortune": {"type": "大吉", "score": 88},
      "conditions": {"dream_details": {"type": "蟒蛇"}},
      "gender_prediction": "male"
    },
    {
      "content": "梦见蛇入怀，主生贵子",
      "fortune": {"type": "大吉", "score": 90},
      "conditions": {"dream_details": {"action": "入怀"}},
      "source": {"book_name": "敦煌梦书", "original_text": "梦见蛇入怀，有贵子"},
      "gender_prediction": "male"
    },
    {
      "content": "梦见在水井中发现蛇，是生下气宇轩昂、卓而不群儿子的征兆",
      "fortune": {"type": "大吉", "score": 88},
      "conditions": {"dream_details": {"location": "水井"}},
      "gender_prediction": "male"
    }
  ],
  "note": "大蛇预示男孩，小蛇预示女孩"
}
```

##### 3. 孕妇梦见虎 (Tiger)
```json
{
  "symbol_id": "prenatal_tiger_001",
  "name": "孕妇梦见虎",
  "interpretations": [
    {
      "content": "孕妇梦见老虎，主生男孩，将来威武有为",
      "fortune": {"type": "大吉", "score": 85},
      "gender_prediction": "male"
    }
  ]
}
```

##### 4. 孕妇梦见牛马 (Ox/Horse)
```json
{
  "symbol_id": "prenatal_oxhorse_001",
  "name": "孕妇梦见牛马",
  "interpretations": [
    {
      "content": "孕妇梦见牛或马，主生男孩，勤劳有力",
      "fortune": {"type": "吉", "score": 78},
      "gender_prediction": "male"
    }
  ]
}
```

##### 5. 孕妇梦见太阳 (Sun)
```json
{
  "symbol_id": "prenatal_sun_001",
  "name": "孕妇梦见太阳",
  "interpretations": [
    {
      "content": "孕妇梦见太阳，主生贵子，将来有大成就",
      "fortune": {"type": "大吉", "score": 90},
      "gender_prediction": "male",
      "source": {"book_name": "民间传说"}
    }
  ]
}
```

#### Symbols Predicting a Girl (生女征兆)

##### 6. 孕妇梦见花 (Flowers)
```json
{
  "symbol_id": "prenatal_flower_001",
  "name": "孕妇梦见花",
  "category": {"primary": "胎梦", "secondary": "生女"},
  "interpretations": [
    {
      "content": "孕妇梦见花，主生女儿，貌美如花",
      "fortune": {"type": "大吉", "score": 85},
      "gender_prediction": "female"
    },
    {
      "content": "梦见莲花，大切な子どもを授かる胎夢（珍贵的孩子）",
      "fortune": {"type": "大吉", "score": 88},
      "conditions": {"dream_details": {"type": "莲花"}},
      "cultural_note": "日本也有此说法"
    }
  ]
}
```

##### 7. 孕妇梦见蝴蝶 (Butterfly)
```json
{
  "symbol_id": "prenatal_butterfly_001",
  "name": "孕妇梦见蝴蝶",
  "interpretations": [
    {
      "content": "孕妇梦见蝴蝶，主生女儿，灵动美丽",
      "fortune": {"type": "吉", "score": 80},
      "gender_prediction": "female"
    }
  ]
}
```

##### 8. 孕妇梦见鸽子 (Pigeon/Dove)
```json
{
  "symbol_id": "prenatal_pigeon_001",
  "name": "孕妇梦见鸽子",
  "interpretations": [
    {
      "content": "孕妇梦见鸽子，主生女儿",
      "fortune": {"type": "吉", "score": 78},
      "gender_prediction": "female"
    }
  ]
}
```

##### 9. 孕妇梦见月亮 (Moon)
```json
{
  "symbol_id": "prenatal_moon_001",
  "name": "孕妇梦见月亮",
  "interpretations": [
    {
      "content": "孕妇梦见月亮，主生女儿，温柔美丽",
      "fortune": {"type": "吉", "score": 82},
      "gender_prediction": "female"
    }
  ]
}
```

##### 10. 孕妇梦见龙尾 (Dragon Tail)
```json
{
  "symbol_id": "prenatal_dragontail_001",
  "name": "孕妇梦见龙尾",
  "interpretations": [
    {
      "content": "梦见龙尾或抱住龙身，预示是漂亮的女儿",
      "fortune": {"type": "吉", "score": 80},
      "gender_prediction": "female"
    }
  ]
}
```

#### Fruit Symbols (水果类胎梦)

##### 11. 孕妇梦见苹果 (Apple)
```json
{
  "symbol_id": "prenatal_apple_001",
  "name": "孕妇梦见苹果",
  "interpretations": [
    {
      "content": "孕妇梦见苹果，主平安顺利，母子健康",
      "fortune": {"type": "大吉", "score": 85},
      "source": {"book_name": "民间传说"}
    },
    {
      "content": "梦见红苹果，多预示生女儿",
      "fortune": {"type": "吉", "score": 78},
      "conditions": {"dream_details": {"color": "红"}},
      "gender_prediction": "female"
    }
  ],
  "cultural_note": "苹果谐音'平'，寓意平安"
}
```

##### 12. 孕妇梦见石榴 (Pomegranate)
```json
{
  "symbol_id": "prenatal_pomegranate_001",
  "name": "孕妇梦见石榴",
  "interpretations": [
    {
      "content": "孕妇梦见石榴，主多子多福",
      "fortune": {"type": "大吉", "score": 88},
      "source": {"book_name": "民间传说"}
    }
  ],
  "cultural_note": "石榴多籽，象征多子多孙"
}
```

##### 13. 孕妇梦见桃子 (Peach)
```json
{
  "symbol_id": "prenatal_peach_001",
  "name": "孕妇梦见桃子",
  "interpretations": [
    {
      "content": "孕妇梦见桃子，主生女儿，福气满满",
      "fortune": {"type": "吉", "score": 80},
      "gender_prediction": "female"
    }
  ]
}
```

##### 14. 孕妇梦见柿子 (Persimmon)
```json
{
  "symbol_id": "prenatal_persimmon_001",
  "name": "孕妇梦见柿子",
  "interpretations": [
    {
      "content": "孕妇梦见柿子，主事事如意，生产顺利",
      "fortune": {"type": "吉", "score": 78},
      "source": {"book_name": "民间传说"}
    }
  ],
  "cultural_note": "柿子谐音'事'，事事如意；韩国태몽中也常见"
}
```

##### 15. 孕妇梦见栗子 (Chestnut)
```json
{
  "symbol_id": "prenatal_chestnut_001",
  "name": "孕妇梦见栗子",
  "interpretations": [
    {
      "content": "孕妇梦见栗子，主生男孩",
      "fortune": {"type": "吉", "score": 75},
      "gender_prediction": "male",
      "cultural_note": "韩国태몽传统中的常见符号"
    }
  ]
}
```

##### 16. 孕妇梦见葡萄 (Grape)
```json
{
  "symbol_id": "prenatal_grape_001",
  "name": "孕妇梦见葡萄",
  "interpretations": [
    {
      "content": "孕妇梦见葡萄，主多子多福",
      "fortune": {"type": "大吉", "score": 82}
    }
  ]
}
```

##### 17. 孕妇梦见樱桃 (Cherry)
```json
{
  "symbol_id": "prenatal_cherry_001",
  "name": "孕妇梦见樱桃",
  "interpretations": [
    {
      "content": "孕妇梦见樱桃，主生女儿，可爱美丽",
      "fortune": {"type": "吉", "score": 78},
      "gender_prediction": "female"
    }
  ]
}
```

### 3.3 Korean Prenatal Dream Traditions (韩国太梦/태몽)

#### Overview
Korean taemong (태몽) is a deeply rooted cultural tradition dating back to at least the 6th century Silla period. The dreams can occur before conception and may be dreamt by family members, not just the pregnant woman.

#### Key Characteristics
- **Dreamer**: Can be mother, father, grandmother, or close family member
- **Timing**: Before, during, or shortly after conception
- **Content**: Usually symbolic (animals, jewels, fruits, nature)
- **Practice**: Dreams can be "bought" or "sold" between people

#### Common Korean Taemong Symbols

##### Animals (动物类)
```json
{
  "korean_taemong_animals": [
    {
      "symbol": "용 (Dragon)",
      "meaning": "Ultimate achievement, spiritual transformation",
      "gender_prediction": "male",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "호랑이 (Tiger)",
      "meaning": "Strength, leadership",
      "gender_prediction": "male",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "학 (White Crane)",
      "meaning": "Spiritual purity, transcendence, longevity",
      "gender_prediction": "either",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "거북이 (Turtle)",
      "meaning": "Longevity, contentment, foresight",
      "gender_prediction": "either",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "뱀 (Snake)",
      "meaning": "Wisdom, rebirth",
      "gender_prediction": "large=male, small=female",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "돼지 (Pig)",
      "meaning": "Wealth, prosperity",
      "gender_prediction": "either",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "금붕어 (Goldfish)",
      "meaning": "Good fortune, abundance",
      "gender_prediction": "either",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "나비 (Butterfly)",
      "meaning": "Freedom, transformation",
      "gender_prediction": "female",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "해태 (Haetae/Unicorn-lion)",
      "meaning": "Protection, justice",
      "gender_prediction": "male",
      "fortune_level": "very auspicious"
    }
  ]
}
```

##### Fruits & Plants (水果植物类)
```json
{
  "korean_taemong_fruits": [
    {
      "symbol": "감 (Persimmon)",
      "meaning": "Everything will go well",
      "gender_prediction": "either",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "사과 (Apple)",
      "meaning": "Peace, health",
      "gender_prediction": "female",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "밤 (Chestnut)",
      "meaning": "Strength",
      "gender_prediction": "male",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "버찌 (Cherry)",
      "meaning": "Beauty, sweetness",
      "gender_prediction": "female",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "꽃 (Flower)",
      "meaning": "Beauty, grace",
      "gender_prediction": "female",
      "fortune_level": "auspicious"
    }
  ]
}
```

##### Precious Objects (珍贵物品类)
```json
{
  "korean_taemong_objects": [
    {
      "symbol": "금 (Gold)",
      "meaning": "Wealth, value",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "보석 (Jewels)",
      "meaning": "Precious child, talent",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "반지 (Ring)",
      "meaning": "Union, promise",
      "gender_prediction": "male (giving), female (receiving)",
      "fortune_level": "auspicious"
    }
  ]
}
```

##### Nature Elements (自然现象类)
```json
{
  "korean_taemong_nature": [
    {
      "symbol": "해 (Sun)",
      "meaning": "Power, success",
      "gender_prediction": "male",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "달 (Moon)",
      "meaning": "Beauty, gentleness",
      "gender_prediction": "female",
      "fortune_level": "auspicious"
    },
    {
      "symbol": "무지개 (Rainbow)",
      "meaning": "Hope, diversity of talents",
      "fortune_level": "very auspicious"
    },
    {
      "symbol": "강/하천 (River)",
      "meaning": "Flow of life, adaptability",
      "fortune_level": "auspicious"
    }
  ]
}
```

### 3.4 Japanese Prenatal Dream Traditions (日本胎夢)

#### Overview
While Japan does not have as distinct a "prenatal dream" (胎夢) tradition as Korea, pregnancy-related dream interpretation (妊娠の夢占い) exists and shares some similarities with Chinese and Korean traditions.

#### Key Differences
- Less formalized than Korean taemong
- More influenced by modern psychological interpretation
- Often combined with general dream interpretation (夢占い)
- Some awareness of Korean taemong through cultural exchange

#### Common Japanese Pregnancy Dream Symbols
```json
{
  "japanese_pregnancy_dreams": [
    {
      "symbol": "蓮の花 (Lotus flower)",
      "meaning": "Precious child will be blessed",
      "fortune_level": "大吉"
    },
    {
      "symbol": "指輪を渡す (Giving a ring)",
      "meaning": "Having a boy",
      "gender_prediction": "male"
    },
    {
      "symbol": "胎動を感じる (Feeling fetal movement)",
      "meaning": "New possibilities, achievements about to bear fruit"
    },
    {
      "symbol": "臨月 (Full-term pregnancy)",
      "meaning": "Goals nearly achieved, completion approaching"
    }
  ]
}
```

### 3.5 Cross-Cultural Comparison

| Symbol | Chinese (中国) | Korean (한국) | Japanese (日本) |
|--------|---------------|---------------|-----------------|
| Dragon | Very auspicious, boy | Very auspicious, boy | Powerful unconscious |
| Snake | Boy (large), fertility | Wisdom, boy (large) | Transformation |
| Tiger | Boy, strength | Boy, leadership | Challenge |
| Flower | Girl, beauty | Girl, beauty | Beauty, blooming |
| Sun | Boy, success | Boy, power | Yang energy |
| Moon | Girl, gentleness | Girl, beauty | Yin energy |
| Fruits | Varies by type | Varies by type | Abundance |
| Gold/Jewels | Wealth, fortune | Precious child | Value |

### 3.6 Important Notes on Prenatal Dreams

**Scientific Perspective**:
Modern science views prenatal dreams as psychological phenomena reflecting:
- Expectant parents' hopes and anxieties
- Hormonal changes during pregnancy
- Cultural conditioning and expectations
- Subconscious processing of parenthood transition

**Cultural Significance**:
Despite scientific skepticism, prenatal dreams hold deep cultural meaning:
- Provide emotional comfort and bonding
- Connect to ancestral traditions
- Create family narratives and mythology
- Help process the transition to parenthood

**Recommendation for AI Implementation**:
When interpreting prenatal dreams, the AI should:
1. Present traditional interpretations with cultural context
2. Include scientific perspective as additional note
3. Avoid definitive gender predictions
4. Emphasize symbolic meaning over literal prediction
5. Provide emotional support regardless of dream content

---

## References

### Primary Sources (原典)
1. 敦煌本《新集周公解梦书》- S.5900、P.3908
2. 《梦林玄解》- 明崇祯刻本
3. 《周公解梦》- 三国时期
4. 《潜夫论·梦列》- 东汉王符

### Academic Sources
1. 刘文英《梦的迷信与梦的探索》(1989)
2. 郑炳林《敦煌写本解梦书校录研究》(2005)
3. 高国藩《敦煌民俗学》(1989)

### Korean Sources
1. 한국민속대백과사전 (Encyclopedia of Korean Folk Culture)
2. USC Digital Folklore Archives - Tae-mong
3. New Orleans Review - Dream DNA: Personal Mythology and Taemong

### Japanese Sources
1. 夢占い related content from Japanese dream interpretation sites
2. Cross-cultural studies on East Asian dream traditions

---

*Document compiled: 2026-01-11*
*Total Entries: 35 Supernatural + 45 People + 17 Prenatal = 97 symbol entries*
*Purpose: AI Dream Interpretation Knowledge Base Enhancement*
