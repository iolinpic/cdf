export const conditionTypes = [
    {
        name:'Периодический урон определенного типа',
        subtype:[
            'Горение',
            'Отравление',
            'Кровотечение',
        ],
        ConditionOptions:{
                "Time": 30.0,
                "Power": 10,
                "PowerModificator": 1.0,
                "Count": -1,
                "ModificatorPerCount": 1.0,
                "Resistances": [
                    {
                        "Type": 8,
                        "Value": -0.5
                    }
                ]
        }
    },{
        name:'Изменение характеристики кризма',
        subtype:[
            'Увеличение атаки',
            'Уменьшение атаки',
            'Увеличение защиты',
            'Уменьшение защиты',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "Value": 1
        }
    },{
        name:'Мокрый',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "CritChanceModificator": 0.2,
            "HealPower": 8,
            "AttackBonus": 3,
            "Resistances": [
                {
                    "Type": 4,
                    "Value": -0.5
                },
                {
                    "Type": 1,
                    "Value": 0.5
                }
            ]
        }
    },{
        name:'Ослепление',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "HitChanceModificator": -0.5,
            "HPMultiplierModif": 0.2,
            "Resistances": [
                {
                    "Type": 7,
                    "Value": 0.5
                }
            ]
        }
    },{
        name:'Оглушение',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "CastTimeModificator": -0.5,
            "Resistances": [
                {
                    "Type": 0,
                    "Value": -0.4
                }
            ]
        }
    },{
        name:'Забывчивость',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0
        }
    },{
        name:'Сонливость',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "Resistances": [
                {
                    "Type": 9,
                    "Value": -0.6
                }
            ]
        }
    },{
        name:'Сон',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "Resistances": [
                {
                    "Type": 0,
                    "Value": -0.3
                },
                {
                    "Type": 1,
                    "Value": -0.3
                },
                {
                    "Type": 2,
                    "Value": -0.3
                },
                {
                    "Type": 3,
                    "Value": -0.3
                },
                {
                    "Type": 4,
                    "Value": -0.3
                },
                {
                    "Type": 5,
                    "Value": -0.3
                },
                {
                    "Type": 6,
                    "Value": -0.3
                },
                {
                    "Type": 7,
                    "Value": -0.3
                },
                {
                    "Type": 8,
                    "Value": -0.3
                },
                {
                    "Type": 9,
                    "Value": -0.3
                }
            ]
        }
    },{
        name:'Шок',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "ShockChance": 0.1,
            "CastTimeModificator": 0.3,
            "Count": 1.0
        }
    },{
        name:'Замешательство',
        subtype:[
            '-',
        ],
        ConditionOptions:{

        }
    },{
        name:'Прерывание атаки',
        subtype:[
            '-',
        ],
        ConditionOptions:{

        }
    },{
        name:'Регенерация',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 11,
            "HealPower": 50,
            "DamagePower": 8,
            "PowerModificator": 1,
            "Count": 5,
            "ModificatorPerCount": 1
        }
    },{
        name:'Зеркальный щит',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "ReflectionChance": 1.0
        }
    },{
        name:'Концентрация',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "CastTimeModificator": 0.5,
            "Resistances": [
                {
                    "Type": 0,
                    "Value": 0.5
                }
            ]
        }
    },{
        name:'Просветление',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "HPMultiplierModif": 0.2
        }
    },{
        name:'Ярость',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "CritChanceModificator": 0.2,
            "Resistances": [
                {
                    "Type": 0,
                    "Value": -0.2
                },
                {
                    "Type": 1,
                    "Value": -0.2
                },
                {
                    "Type": 2,
                    "Value": -0.2
                },
                {
                    "Type": 3,
                    "Value": -0.2
                },
                {
                    "Type": 4,
                    "Value": -0.2
                },
                {
                    "Type": 5,
                    "Value": -0.2
                },
                {
                    "Type": 6,
                    "Value": -0.2
                },
                {
                    "Type": 7,
                    "Value": -0.2
                },
                {
                    "Type": 8,
                    "Value": -0.2
                },
                {
                    "Type": 9,
                    "Value": -0.2
                }
            ]
        }
    },{
        name:'Вампиризм',
        subtype:[
            '-',
        ],
        ConditionOptions:{
            "Time": 10.0,
            "HealPercent": 0.5
        }
    },{
        name:'Непоколебимость',
        subtype:[
            '-',
        ],
        ConditionOptions:{

        }
    },{
        name:'Щиты',
        subtype:[
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
        ConditionOptions:{
            "Time": 11
        }
    },{
        name:'Очищение',
        subtype:[
            '-',
        ],
        ConditionOptions:{

        }
    },
];
export const crysmTypes = [
    'Нормальный',
    'Огненный',
    'Водяной',
    'Природный',
    'Электрический',
    'Земляной',
    'Воздушный',
    'Светлый',
    'Темный',
    'Паранормальный',
];