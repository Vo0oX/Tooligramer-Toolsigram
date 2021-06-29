module.exports = {
    pay: [
        [
            {
                text: '✅Оплатить',
                callback_data: 'pay'
            }
        ],
        [
            {
                text: '❌Отмена',
                callback_data: 'cancel'
            }
        ]
    ],
    paysmm: [
        [
            {
                text: '✅Оплатить',
                callback_data: 'paysmm'
            }
        ],
        [
            {
                text: '❌Отмена',
                callback_data: 'cancel'
            }
        ]
    ],
    add_funds: [
        [
            {
                text: '✅Пополнить',
                callback_data: 'add_funds'
            }
        ],
        [
            {
                text: '❌Отмена',
                callback_data: 'cancel'
            }
        ]
    ],
    create_ref: [
        [
            {
                text: '✅Получить ссылку',
                callback_data: 'takeRef'
            }
        ],
        [
            {
                text: '🧮Мои рефералы',
                callback_data: 'clientRefs'
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    help: [
        [
            {
                text: '💡Инструкция',
                callback_data: 'Instructions'
            }
        ],
        [
            {
                text: '👤 Служба поддержки - чат',
                url: "https://t.me/Toolsigram_Support"
            }
        ],[
            {
                text: '📧 Почта - toolsigram@gmail.com',
                url: "https://mail.google.com/mail/?extsrc=mailto&url=mailto:toolsigram@gmail.com"
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]
    ],
    general: {
        home_menu: '💡Главное меню',
    },
    admin: {
        All_Status: '📊All Status',
        Live_Status: '📉Live Status',
        Live_Stop: '🛑Live Stop',
        Admin: '🛒Admin',
        BalanceL: '💸My balance in likemania',
        BalanceS: '💸My balance in smmyt',
        TaskL: '📑My task in likemania',
        TaskS: '📑My task in smmyt',
        AllUser: '👥How many users',
        home_menu: '💡Главное меню',
        Announcement: '📣Announcement',
        Announcement_preview: '📢Announcement Preview',
        ref_reg: '📢Рефералы',

    },
    back: [
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]
    ],
    taskbutton: [
        [
            {
                text: 'Выполненные',
                callback_data: 'finishTask'
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]
    ],
    homepage: [
        [
            {
                text: '🛒Сделать заказ',
                callback_data: 'заказ'
            },
            {
                text: '👤Профиль',
                callback_data: 'профиль'
            }
        ],
        [
            {
                text: '⁉️FAQ',
                callback_data: 'faq'
            },

        ]
    ],
    profile: [
        [
            {
                text: '💵Пополнить баланс',
                callback_data: 'add_funds'
            }
        ],
        [
            {
                text: '🛒История заказов',
                callback_data: 'История заказов'
            },
            {
                text: '💸История пополнения',
                callback_data: 'История пополнения'
            }
        ],
        [
            {
                text: '📈Реферальная система',
                callback_data: 'CreateRef'
            }
        ],
        [
            {
                text: '↩️На главную',
                callback_data: 'На главную'
            }
        ]
    ],
    select_social: [
        [
            {
                text: '✈️ Telegram',
                callback_data: 'Telegram'
            },

        ],
        [
            {
                text: '🔥Instagram',
                callback_data: 'Instagram'
            },

        ],
        [
            {
                text: '🧨TikTok',
                callback_data: 'TikTok'
            }
        ],
        [
            {
                text: '🥇Vkontakte',
                callback_data: 'Vkontakte'
            }
        ],
        [
            {
                text: '👤Facebook',
                callback_data: 'Facebook'
            }
        ],
        [
            {
                text: '👥Одноклассники',
                callback_data: 'Odnoklassniki'
            }
        ],
        [
            {
                text: '📺YouTube',
                callback_data: 'YouTube'
            }
        ],
        [
            {
                text: 'Twitter',
                callback_data: 'Twitter'
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]
    ],
    instagram_services: [
        [
            {
                callback_data: '76',
                id: 76,
                is_subscribe: true,
                is_package: false,
                name: "Авто лайки + просмотры - 0.27руб/шт",
                text: "Боты Авто лайки + просмотры  - 0.27руб/шт",
                price: 0.27,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 10,
                max: 20000,
                step: 1,
                alert: "Вы будете автоматически получать лайки и просмотры. Фото получают лайки, видео получают лайки + просмотры. Лайки с гарантией от списаний"
            }
        ],
        [
            {
                callback_data: '170',
                id: 76,
                is_subscribe: true,
                is_package: false,
                name: "Авто лайки + просмотры - 0.33руб/шт",
                text: "Люди Авто лайки + просмотры  - 0.33руб/шт",
                price: 0.33,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 10,
                max: 25000,
                step: 1,
                alert: "Вы будете автоматически получать лайки и просмотры. Фото получают лайки, видео получают лайки + просмотры. Мы делаем в подарок в два раза больше просмотров."
            }
        ],
        [
            {
                callback_data: '90',
                id: 90,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Bot Followers - 0,70руб/шт",
                text: "Подписчики Боты - 0,70руб/шт",
                price: 0.70,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 10,
                max: 5000,
                step: 1,
                alert: "Боты со всего мира. В базе около 10 000 шт. Возможны большие списания со стороны instagram до 90%. Закрытые профили не принимаются. У живых списания 5-15%"
            }
        ],
        [
            {
                callback_data: '159',
                id: 159,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Real Followers - 2руб/шт",
                text: "Подписчики Люди - 2руб/шт",
                price: 2,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 10,
                max: 100000,
                step: 1,
                alert: "Пользователи с аватаркой и фото, часть русскоговорящие. В базе около 50.000 подписчиков. Списания 5-15%, качество хорошее. Старт в течение дня."
            }
        ],
        [
            {
                callback_data: '75',
                id: 75,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Bot Likes - 0,27руб/шт",
                text: "Лайки Боты - 0,27руб/шт",
                price: 0.27,
                text1: "укажите ссылку на фото",
                example: 'https://instagram.com/p/9ztjgAuS4t/',
                min: 10,
                max: 20000,
                step: 1,
                alert: "У роботов есть только аватарка, пользователи со всего мира. Максимальный заказ на одно фото 100 тысяч лайков. Лайки с гарантией от списаний"
            }
        ],
        [
            {
                callback_data: '169',
                id: 169,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Real Likes - 0,33руб/шт",
                text: "Лайки Люди  - 0,33руб/шт",
                price: 0.33,
                text1: "укажите ссылку на фото",
                example: 'https://instagram.com/p/9ztjgAuS4t/',
                min: 10,
                max: 25000,
                step: 1,
                alert: "Русскоязычные аккаунты с аватаркой, у некоторых есть фотографии. Рекомендуем оформить для теста 10 шт. Лайки с гарантией от списаний"
            }
        ],
        [
            {
                callback_data: '147',
                id: 147,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Bot Video",
                text: "Просмотры видео Боты - 0,06руб/шт",
                price: 0.06,
                text1: "укажите ссылку на видео",
                example: 'https://www.instagram.com/p/9ztjgAuS4t/',
                min: 100,
                max: 1000000,
                step: 1,
                alert: "Выполнение начинается в течение 5-40 мин., статус выполнения может отображаться с задержкой. Накрутка на карусели невозможна, указывайте ссылку на видео"
            }
        ],
        [
            {
                callback_data: '148',
                id: 148,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Real Video - 0,07руб/шт",
                text: "Просмотры видео Люди - 0,07руб/шт",
                price: 0.07,
                text1: "укажите ссылку на видео",
                example: 'https://www.instagram.com/p/9ztjgAuS4t/',
                min: 100,
                max: 1000000,
                step: 1,
                alert: "Выполнение начинается в течение 5-40 мин., статус выполнения может отображаться с задержкой. Накрутка на карусели невозможна, указывайте ссылку на видео"
            }
        ],
        [
            {
                callback_data: '78',
                id: 78,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Stories",
                text: "Просмотры stories - 0,12руб/шт",
                price: 0.12,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 250,
                max: 6000,
                step: 1,
                alert: "Просмотры Stories выполняются роботами, выполнение заказов начинается в течение 5-40 минут. Просмотры поступают на все сторис опубликованные за последние 24 часа"
            }
        ],
        [
            {
                callback_data: '156',
                id: 156,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Stories30",
                text: "Авто просмотры stories (30 дней) - 5,80руб/шт",
                price: 5.8,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 500,
                max: 10000,
                step: 1,
                alert: "Авто просмотры ваших историй в течение 30 дней, просмотры начинают поступать в течение 5-60 минут. Ограничений по количеству историй нет."
            }
        ],
        [
            {
                callback_data: '177',
                id: 177,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Saves",
                text: "Сохранения - 0,12руб/шт",
                price: 0.12,
                text1: "укажите ссылку на фото",
                example: 'https://instagram.com/p/9ztjgAuS4t/',
                min: 100,
                max: 80000,
                step: 1,
                alert: "Накрутка сохранений в instagram увеличивает шансы попадания в топ. Выполняется русскоязычными пользователями."
            }
        ],


        [
            {
                callback_data: '153',
                id: 153,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Reach & Impressions",
                text: "Охват и показы публикации - 0,12руб/шт",
                price: 0.12,
                text1: "укажите ссылку на фото",
                example: 'https://instagram.com/p/9ztjgAuS4t/',
                min: 100,
                max: 12000,
                step: 1,
                alert: "Накрутка охвата публикаций. Вместе с охватом идут показы. Указывайте ссылку на фото или видео"
            }
        ],
        /**

         [
         {
             callback_data: '95',
             id: 95,
             web_id: 1,
             is_subscribe: false,
             is_package: false,
             name: "Comments Your",
             text: "❌Коментарии (Свой текст) - 4руб/шт",
             price: 4,
             text1: "укажите ссылку на фото или видео",
             example: "/p/9ztjgAuS4t/",
             min: 5,
             max: 1000,
             step: 1,
             alert: "Комментарии от ботов с вашим текстом, без смайлов. Каждый коммент с новой строчки. Instagram может скрывать часть комментов. Накрутка на IGTV не срабатывает."
         }
         ],

         **/

        [
            {
                callback_data: '100',
                id: 100,
                web_id: 1,
                is_subscribe: false,
                is_package: false,
                name: "Likes to comment",
                text: "Лайки на комментарий - 0,54руб/шт",
                price: 0.54,
                text1: "укажите ссылку на фото / пост",
                example: 'https://instagram.com/p/9ztjgAuS4t/',
                min: 20,
                max: 10000,
                step: 1,
                alert: "Лайки на комментарий. Укажите ссылку на пост и пользователя которого нужно лайкнуть. Старт в течение часа"
            }
        ],


        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    telegram_services: [
        [
            {
                callback_data: '13587',
                id: 13587,
                is_subscribe: false,
                text: "Подписчики на канал Телеграм: Старт",
                price: 0.36,
                text1: "укажите логин в instagram",
                example: "durov",
                min: 250,
                max: 100000000,
                step: 1,
                alert: "Обычная накрутка подписчиков на канал в Телеграм + обычная плавающая скорость"
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]
    ],
    tiktok_services: [
        [
            {
                callback_data: '203',
                id: 203,
                web_id: 9,
                is_subscribe: true,
                is_package: false,
                name: "Likes(Subscribe)",
                text: 'Боты Авто лайки + просмотры 0.98руб/шт',
                label: "Авто лайки + просмотры",
                price: 0.98,
                text1: "укажите логин в tiktok",
                example: "savko",
                min: 10,
                max: 30000,
                step: 1,
                alert: "Вы будете автоматически получать лайки и просмотры. Мы делаем в подарок в два раза больше просмотров."
            },
        ],
        [
            {
                callback_data: '204',
                id: 204,
                web_id: 9,
                is_subscribe: true,
                is_package: false,
                name: "Real Likes(Subscribe)",
                text: 'Люди Авто лайки + просмотры 1.38руб/шт',
                label: "Авто лайки + просмотры",
                price: 1.38,
                text1: "укажите логин в tiktok",
                example: "savko",
                min: 10,
                max: 50000,
                step: 1,
                alert: "Вы будете автоматически получать лайки и просмотры. Мы делаем в подарок в два раза больше просмотров."
            },
        ],
        [
            {
                callback_data: '201',
                id: 201,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Real Followers",
                text: 'Подписчики Люди 1.38руб/шт',
                label: "Подписчики",
                price: 1.38,
                text1: "укажите логин в tiktok",
                example: "savko",
                min: 15,
                max: 10000,
                step: 1,
                alert: "Живые подписчики, наполненные аккаунты, подписываются на чужие страницы за бонусы . Старт в течение 1-2 часов. В базе 5 тыс. исполнителей"
            },
        ],
        [
            {
                callback_data: '139',
                id: 139,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Likes",
                text: 'Лайки Роботы 0.98руб/шт',
                label: "Лайки",
                price: 0.98,
                text1: "укажите ссылку на видео",
                example: 'https://www.tiktok.com/@savko/video/6740628009834810629',
                min: 10,
                max: 1000,
                step: 10,
                alert: ""
            },
        ],
        [
            {
                callback_data: '202',
                id: 202,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Real Likes",
                text: 'Лайки Люди 1.38/руб/шт',
                label: "Лайки",
                price: 1.38,
                text1: "укажите ссылку на видео",
                example: 'https://www.tiktok.com/@savko/video/6740628009834810629',
                min: 10,
                max: 1000,
                step: 10,
                alert: "Живые лайки хорошего качества. Наполненные аккаунты, у большинства есть с аватарки и видео. Максимум для одного видео 5 000 лайков"
            },
        ],
        [
            {
                callback_data: '163',
                id: 163,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Reposts",
                text: 'Поделиться  1.7руб/шт',
                label: "Поделиться",
                price: 1.7,
                text1: "укажите ссылку на видео",
                example: "tiktok.com/@savko/video/6740628009834810629",
                min: 20,
                max: 100000,
                step: 1,
                alert: "Накрутка поделиться в TikTok, повышает шансы попадания в рекомендации. "
            },
        ],
        [
            {
                callback_data: '154',
                id: 154,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Views",
                text: 'Просмотры Роботы 0.06руб/шт',
                label: "Просмотры",
                price: 0.06,
                text1: "укажите ссылку на видео",
                example: "tiktok.com/@savko/video/6740628009834810629",
                min: 1000,
                max: 5000000,
                step: 1000,
                alert: "Накрутка просмотров в TikTok ботами, старт в течение 5-30 минут, скорость до 10 млн. в сутки. Максимальный заказ 10 млн. просмотров"
            },
        ],
        [
            {
                callback_data: '196',
                id: 196,
                web_id: 9,
                is_subscribe: false,
                is_package: false,
                name: "Real Views",
                text: 'Просмотры Люди 0.10руб/шт',
                label: "Просмотры",
                price: 0.10,
                text1: "укажите ссылку на видео",
                example: "tiktok.com/@savko/video/6740628009834810629",
                min: 1000,
                max: 500000,
                step: 1000,
                alert: "Накрутка живых просмотров в TikTok, старт в течение 5-30 минут, скорость до 1-2 млн. в сутки. Максимальный заказ 100 млн. просмотров"
            },
        ],

        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    vkontakte_services: [
        [
            {
                callback_data: '39',
                id: 39,
                web_id: 3,
                is_subscribe: true,
                is_package: false,
                name: "Likes(Subscribe)",
                text: 'Боты Авто лайки 0.30руб/шт',
                label: "Авто лайки",
                price: 0.30,
                text1: "укажите ссылку группу",
                example: "vk.com/plus",
                min: 20,
                max: 100000,
                step: 1,
                alert: "Вы будете автоматически получать лайки (роботы) на последние (уже опубликованные) или будущие посты. Лайки начинают поступать в течение 5-30 минут."
            }
        ],
        [
            {
                callback_data: '40',
                id: 40,
                web_id: 3,
                is_subscribe: true,
                is_package: false,
                name: "Real Likes(Subscribe)",
                text: 'Люди Авто лайки 0.98руб/шт',
                label: "Авто лайки",
                price: 0.98,
                text1: "укажите ссылку группу",
                example: "vk.com/plus",
                min: 20,
                max: 100000,
                step: 1,
                alert: "Вы будете автоматически получать живые лайки на последние (уже опубликованные) или будущие посты. Лайки начинают поступать в течение 5-30 минут."
            }
        ],
        [
            {
                callback_data: '33',
                id: 33,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Followers",
                text: 'Боты Подписчики в группу 0.56руб/шт',
                label: "Подписчики в группу",
                price: 0.56,
                text1: "укажите ссылку группу",
                example: "vk.com/plus",
                min: 100,
                max: 5000,
                step: 1,
                alert: "В нашей базе около 5.000 роботов вконтакте. В сутки поступает по 30-70 подписчиков. Если нужно быстрее » оформляйте живых. Вконтакте может списывать подписчиков"
            }
        ],
        [
            {
                callback_data: '34',
                id: 34,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Real Followers",
                text: 'Люди подписчики в группу 1.7руб/шт',
                label: "Живые подписчики",
                price: 1.7,
                text1: "укажите ссылку группу",
                example: "vk.com/real",
                min: 100,
                max: 5000,
                step: 1,
                alert: "В базе около 5 000 живых подписчиков, в сутки поступает по 300-600 подписчиков. Такая скорость безопасна для вашей страницы, возможны списания"
            }
        ],
        [
            {
                callback_data: '35',
                id: 35,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Likes",
                text: 'Боты Лайки 0.30руб/шт',
                label: "Лайки",
                price: 0.30,
                text1: "укажите ссылку на фото / пост",
                example: 'https://vk.com/plus?w=wall-76477496_38209',
                min: 20,
                max: 50000,
                step: 1,
                alert: "Публикация должна быть открыта для всех, комментарии включены. Фотографии и посты с закрытыми комментариями удаляются, деньги возвращаются на ваш баланс"
            }
        ],
        [
            {
                callback_data: '36',
                id: 36,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Real Likes",
                text: 'Люди Лайки 0.98руб/шт',
                label: "Лайки",
                price: 0.98,
                text1: "укажите ссылку на фото / пост",
                example: 'https://vk.real/real?w=wall-76477496_38209',
                min: 20,
                max: 50000,
                step: 1,
                alert: "Публикация должна быть открыта для всех, комментарии включены. Фотографии и посты с закрытыми комментариями удаляются, деньги возвращаются на ваш баланс"
            }
        ],
        [
            {
                callback_data: '37',
                id: 37,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Friends",
                text: 'Боты Друзья 0.58руб/шт',
                label: "Друзья",
                price: 0.58,
                text1: "Укажите ссылку на профиль",
                example: 'https://vk.com/durov',
                min: 100,
                max: 5000,
                step: 1,
                alert: "Роботы могут стать собачками. Вконтакте может списывать некоторых пользователей прямо во время накрутки, заказывайте с запасом. "
            }
        ],
        [
            {
                callback_data: '38',
                id: 38,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Real Friends",
                text: 'Люди Друзья 1.7руб/шт',
                label: "Друзья",
                price: 1.7,
                text1: "Укажите ссылку на профиль",
                example: 'https://vk.com/durov',
                min: 100,
                max: 5000,
                step: 1,
                alert: "У вас должно быть как минимум 10 записей на стене, иначе заказ будет отменён, а деньги вернутся на баланс на сайте. Вконтакте может списывать подписчиков"
            }
        ],
        [
            {
                callback_data: '161',
                id: 161,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Video",
                text: 'Просмотры видео 0.30руб/шт',
                label: "Просмотры видео",
                price: 0.30,
                text1: "укажите ссылку на видео",
                example: 'https://vk.com/video-76477496_38209',
                min: 100,
                max: 2000,
                step: 1,
                alert: ""
            }
        ],
        [
            {
                callback_data: '45',
                id: 45,
                web_id: 3,
                is_subscribe: false,
                is_package: false,
                name: "Reposts",
                text: 'Поделиться 1.78руб/шт',
                label: "Репосты",
                price: 1.78,
                text1: "укажите ссылку на фото / пост",
                example: 'https://vk.com/wall-76477496_38209',
                min: 5,
                max: 5000,
                step: 1,
                alert: "Репосты выполняются офферами, вконтакте может списывать часть репостов. Заказывайте с большим запасом"
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    facebook_services: [

        [
            {
                callback_data: '42',
                id: 42,
                web_id: 4,
                is_subscribe: false,
                is_package: false,
                name: "Likes on page",
                text: 'Нравится fanpage 2руб/шт',
                label: "Нравится fanpage",
                price: 2,
                text1: "укажите ссылку на fanpage (страницу)",
                example: 'https://www.facebook.com/audi/',
                min: 10,
                max: 5000,
                step: 1,
                alert: "Старт в течение дня. Скорость не более 100 шт. в сутки. Принимаются только русскоязычные страницы. Возможны списания со стороны facebook"
            }
        ],
        [
            {
                callback_data: '44',
                id: 44,
                web_id: 4,
                is_subscribe: false,
                is_package: false,
                name: "Join",
                text: 'Вступить в группу 2руб/шт',
                label: "Вступить в группу",
                price: 2,
                text1: "укажите ссылку на группу",
                example: 'https://www.facebook.com/groups/285807801892928/',
                min: 10,
                max: 10000,
                step: 1,
                alert: "Заказы в facebook проходят модерацию и начинают выполняться в течение дня. Скорость не более 100 подписчиков в сутки. Возможны списания со стороны facebook"
            }
        ],
        [
            {
                callback_data: '43',
                id: 43,
                web_id: 4,
                is_subscribe: false,
                is_package: false,
                name: "Friends",
                text: 'Друзья 2руб/шт',
                label: "Друзья",
                price: 2,
                text1: "укажите ссылку на личный профиль",
                example: 'https://www.facebook.com/zuck',
                min: 10,
                max: 10000,
                step: 1,
                alert: "Заказы в facebook проходят модерацию и начинают выполняться в течение дня. Скорость не более 100 подписчиков в сутки. Возможны списания со стороны facebook"
            }
        ],
        [
            {
                callback_data: '41',
                id: 41,
                web_id: 4,
                is_subscribe: false,
                is_package: false,
                name: "Likes on photo or post",
                text: 'Нравится фото/пост 2руб/шт',
                label: "Нравится фото/пост",
                price: 2,
                text1: "укажите ссылку на фото/пост",
                example: 'https://www.facebook.com/aleksandrrevvaofficial/videos/1346619428786452/',
                min: 10,
                max: 10000,
                step: 1,
                alert: "Лайки начинают поступать в течение дня. В сутки можно накрутить около 1-3 тысяч лайков на фото или пост. Возможны небольшие списания со стороны facebook"
            }
        ],


        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    odnoklassniki_services: [

        [
            {
                callback_data: '145',
                id: 145,
                web_id: 8,
                is_subscribe: false,
                is_package: false,
                name: "Followers",
                text: 'Подписчики 2,8руб/шт',
                label: "Подписчики",
                price: 2.8,
                text1: "укажите ссылку на одноклассники",
                example: 'http://odnoklassniki.ru/group/52311784423583',
                min: 100,
                max: 10000,
                step: 1,
                alert: ""
            }
        ],
        [
            {
                callback_data: '31',
                id: 31,
                web_id: 8,
                is_subscribe: false,
                is_package: false,
                name: "Friends",
                text: 'Друзья 2.8руб/шт',
                label: "Друзья",
                price: 2.8,
                text1: "укажите ссылку на одноклассники",
                example: 'https://ok.ru/fkirkorov.official',
                min: 50,
                max: 2000,
                step: 10,
                alert: ""
            }
        ],
        [
            {
                callback_data: '144',
                id: 144,
                web_id: 8,
                is_subscribe: false,
                is_package: false,
                name: "Likes",
                text: 'Likes 2.8руб/шт',
                label: "Классы",
                price: 2.8,
                text1: "укажите ссылку на одноклассники",
                example: 'https://ok.ru/otserdt/album/54470853722124/834908041228',
                min: 50,
                max: 10000,
                step: 1,
                alert: "Классы выполняются пользователями из России и СНГ. В базе около 10 000 исполнителей."
            }
        ],
        [
            {
                callback_data: '146',
                id: 146,
                web_id: 8,
                is_subscribe: false,
                is_package: false,
                name: "Reposts",
                text: 'Поделиться 2,8руб/шт',
                label: "Поделиться ",
                price: 2.8,
                text1: "укажите ссылку на одноклассники",
                example: 'https://ok.ru/otserdt/album/54470853722124/834908041228',
                min: 50,
                max: 10000,
                step: 1,
                alert: "Вашей публикацией поделятся у себя на странице или в группе"
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    twitter_services: [

        [
            {
                callback_data: '3',
                id: 3,
                web_id: 2,
                is_subscribe: false,
                is_package: false,
                name: "Followers",
                text: "Подписчики 2.50руб/шт",
                label: "Подписчики",
                price: 2.50,
                text1: "укажите ссылку на twitter",
                example: 'https://twitter.com/durov/',
                min: 10,
                max: 10000,
                step: 1,
                alert: ""
            }
        ],
        [
            {
                callback_data: '4',
                id: 4,
                web_id: 2,
                is_subscribe: false,
                is_package: false,
                name: "Retweets",
                text: "Ретвиты 2.50руб/шт",
                label: "Ретвиты",
                price: 2.50,
                text1: "укажите ссылку на твит",
                example: 'https://twitter.com/durov/status/733008251466317828',
                min: 50,
                max: 10000,
                step: 1,
                alert: ""
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],
    youtube_services: [

        [
            {
                callback_data: '16',
                id: 16,
                web_id: 5,
                is_subscribe: false,
                is_package: false,
                name: "Followers",
                text: "Подписчики 8руб/шт",
                label: "Подписчики",
                price: 8,
                text1: "укажите ссылку на канал",
                example: 'https://www.youtube.com/user/kvn',
                min: 10,
                max: 300000,
                step: 10,
                alert: "YouTube может списывать от 5 до 80% подписчиков, таким образом они борются с накруткой. Заказывайте с запасом"
            }
        ],
        [
            {
                callback_data: '14',
                id: 14,
                web_id: 5,
                is_subscribe: false,
                is_package: false,
                name: "Likes",
                text: "Лайки 8руб/шт",
                label: "Лайки",
                price: 8,
                text1: "укажите ссылку на видео",
                example: 'https://www.youtube.com/watch?v = wsYDuUdj2Ck',
                min: 10,
                max: 1000,
                step: 10,
                alert: "YouTube может списывать некоторые лайки, таким образом они борются с накруткой. Заказывайте с запасом"
            }
        ],
        [
            {
                callback_data: '15',
                id: 15,
                web_id: 5,
                is_subscribe: false,
                is_package: false,
                name: "Dislikes",
                text: "Дизлайки 8руб/шт",
                label: "Дизлайки",
                price: 8,
                text1: "укажите ссылку на видео",
                example: 'https://www.youtube.com/watch?v = wsYDuUdj2Ck',
                min: 10,
                max: 1000,
                step: 10,
                alert: "YouTube может списывать некоторые дизлайки, таким образом они борются с накруткой. Заказывайте с запасом"
            }
        ],
        [
            {
                callback_data: '25',
                id: 25,
                web_id: 5,
                is_subscribe: false,
                is_package: false,
                name: "Views",
                text: "Просмотры 0.78руб/шт",
                label: "Просмотры",
                price: 0.78,
                text1: "укажите ссылку на видео",
                example: 'https://www.youtube.com/watch?v = wsYDuUdj2Ck',
                min: 1000,
                max: 100000,
                step: 1000,
                alert: "Быстрый старт. Скорость 5 - 10 тыс. в сутки. (глубина просмотров 10 сек. - 3 мин.) Мин заказ 1 тыс. Возможны списания, авто докрутка 20 дней. Просмотры со всего мира"
            }
        ],
        [
            {
                text: '↩️Назад',
                callback_data: 'back'
            }
        ]

    ],

};