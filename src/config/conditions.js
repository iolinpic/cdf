export const conditionTypes = [
    {
        name: 'Периодический урон определенного типа',
        description: '',
        subtype: [
            'Горение',
            'Отравление',
            'Кровотечение',
        ],
        ConditionOptions: {
            "Time": 30.0,
            "Power": 10,
            "PowerModificator": 1.0,
            "Count": -1,
            "ModificatorPerCount": 1.0,
            // "Resistances": [
            //     {
            //         "Type": 8,
            //         "Value": -0.5
            //     }
            // ]
        }
    }, {
        name: 'Изменение характеристики кризма',
        description: 'Увеличивает или уменьшает один из этих параметров',
        subtype: [
            'Увеличение атаки',
            'Уменьшение атаки',
            'Увеличение защиты',
            'Уменьшение защиты',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "Value": 1
        }
    }, {
        name: 'Мокрый',
        description: 'В обычном варианте уменьшает сопротивление от электрических атак и увеличивает от огненных,' +
            ' а так же снижает шанс критического урона. В первом альтернативном варианте увеличивает атаку водных кризмов.' +
            ' Во втором альтернативном варианте лечит природных кризмов.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "CritChanceModificator": 0.2,
            "HealPower": 8,
            "AttackBonus": 3,
            // "Resistances": [
            //     {
            //         "Type": 4,
            //         "Value": -0.5
            //     },
            //     {
            //         "Type": 1,
            //         "Value": 0.5
            //     }
            // ]
        }
    }, {
        name: 'Ослепление',
        description: 'В обычном варианте снижает шанс попадания для кризма, а так же увеличивает сопротивление свету.' +
            'В альтернативном варианте увеличивает здоровье светлых кризмов и уменьшает темным.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "HitChanceModificator": -0.5,
            "HPMultiplierModif": 0.2,
            // "Resistances": [
            //     {
            //         "Type": 7,
            //         "Value": 0.5
            //     }
            // ]
        }
    }, {
        name: 'Оглушение',
        description: 'В обычном варианте увеличивает время каста и снижает сопротивление физическому урону.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "CastTimeModificator": -0.5,
            // "Resistances": [
            //     {
            //         "Type": 0,
            //         "Value": -0.4
            //     }
            // ]
        }
    }, {
        name: 'Забывчивость',
        description: 'Кризм кастует случайное заклинание, пока действует данный статусный эффект.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0
        }
    }, {
        name: 'Сонливость',
        description: 'Если кризм не будет атакован в течении времени действия он уснет. Снижает сопротивляемость паранормальному урону.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            // "Resistances": [
            //     {
            //         "Type": 9,
            //         "Value": -0.6
            //     }
            // ]
        }
    }, {
        name: 'Сон',
        description: 'Кризм не может принимать участие в бою пока действует сон. Все резисты снижаются.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            // "Resistances": [
            //     {
            //         "Type": 0,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 1,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 2,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 3,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 4,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 5,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 6,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 7,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 8,
            //         "Value": -0.3
            //     },
            //     {
            //         "Type": 9,
            //         "Value": -0.3
            //     }
            // ]
        }
    }, {
        name: 'Шок',
        description: 'С некоторой вероятностью прерывает каст заклинания пока действует. В альтернативном варианте ускоряет каст заклинаний.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "ShockChance": 0.1,
            "CastTimeModificator": 0.3,
            "Count": 1.0
        }
    }, {
        name: 'Замешательство',
        description: 'С некоторым шансом следующей атакой кризм атакует случайного кризма.',
        subtype: [
            '-',
        ],
        ConditionOptions: {}
    }, {
        name: 'Прерывание атаки',
        description: 'Технический статусный эффект прерывающий атаку.',
        subtype: [
            '-',
        ],
        ConditionOptions: {}
    }, {
        name: 'Регенерация',
        description: 'Восстанавливает здоровье в течении времени. Наносит урон паранормальным.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 11,
            "HealPower": 50,
            "DamagePower": 8,
            "PowerModificator": 1,
            "Count": 5,
            "ModificatorPerCount": 1
        }
    }, {
        name: 'Зеркальный щит',
        description: 'Увеличивает шанс отражения у книзма.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "ReflectionChance": 1.0
        }
    }, {
        name: 'Концентрация',
        description: 'Уменьшает время каста следующей способности. Дает сопротивляемость физическому урону.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "CastTimeModificator": 0.5,
            // "Resistances": [
            //     {
            //         "Type": 0,
            //         "Value": 0.5
            //     }
            // ]
        }
    }, {
        name: 'Просветление',
        description: 'Увеличивает значение HP.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "HPMultiplierModif": 0.2
        }
    }, {
        name: 'Ярость',
        description: 'Увеличивает шанс критического удара. Снижает сопротивляемость всем видам урона.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "CritChanceModificator": 0.2,
            // "Resistances": [
            //     {
            //         "Type": 0,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 1,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 2,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 3,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 4,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 5,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 6,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 7,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 8,
            //         "Value": -0.2
            //     },
            //     {
            //         "Type": 9,
            //         "Value": -0.2
            //     }
            // ]
        }
    }, {
        name: 'Вампиризм',
        description: 'В случае успешного урона часть здоровья может вернутся кризму в качестве лечения.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "Time": 10.0,
            "HealPercent": 0.5
        }
    }, {
        name: 'Непоколебимость',
        description: 'Не позволяет накладывать статусные эффекты на кризма.',
        subtype: [
            '-',
        ],
        ConditionOptions: {}
    }, {
        name: 'Щиты',
        description: 'В зависимости от подтипа накладывает тот или иной статусный эффект на атакующего кризма.',
        subtype: [
            'Горение',
            'Ослепление',
            'Кровотечение',
            'Замешательство',
            'Отравление',
            'Шок',
            'Сонливость',
            'Мокрый',
            'Забывчивость',
            'Оглушение',
        ],
        ConditionOptions: {
            "Time": 11
        }
    }, {
        name: 'Очищение',
        description: 'Технический кондишен снимающий все прочие статусные эффекты, если был наложен.',
        subtype: [
            '-',
        ],
        ConditionOptions: {
            "ConditionsTypes":
                [
                    {
                        "Type": 0,
                        "Subtype": 0
                    }
                ]
        }
    },
];
export const conditionNamesTranslate = {
    "Time": "Длительность",
    "HealPercent": "Процент от нанесенного урона вернется в качестве лечения",
    "CritChanceModificator": "Увеличение модификатора критического урона",
    "HPMultiplierModif": "Увеличение модификатора уровня здоровья",
    "CastTimeModificator": "Увеличение модификатора времени каста заклинания",
    "HealPower": "Сила исцеления",
    "DamagePower": "Урон",
    "PowerModificator": "Модификатор силы",
    "Count": "Количество применений за длительность",
    "ModificatorPerCount": "Изменение модификатора силы после каждого применения",
    "ReflectionChance": "Шанс отражения (1 – 100%)",
    "ShockChance": "Шанс прерывания заклинания (1 – 100%)",
    "HitChanceModificator": "Изменение шанса попадания",
    "AttackBonus": "Увеличения атаки в альтернативном варианте",
    "Power": "Урон без множителей",
    "Value": "Значение",
};
