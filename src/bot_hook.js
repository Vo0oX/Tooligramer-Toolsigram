const helper = require('./helper');
const keyboard = require('./keyboard');
const kb = require('./keyboard_buttons');

module.exports = {
    callback_msg(msg) {
        console.log(2);

        let step;

        helper.userCheck(helper.getChatId(msg), function (row) {


            if (msg.text === kb.general.home_menu) {

                bot.sendMessage(helper.getChatId(msg), '☁️Выберите нужный Вам раздел ниже:', {
                    reply_markup: {inline_keyboard: kb.homepage}
                });

                helper.resetUserInfo(helper.getChatId(msg), function (row) {
                    console.log(row);
                });

                step = 'v2';
                helper.switchState(helper.getChatId(msg), step);

            }
            else {

                // Пополнить баланс
                if (row[0].step === 'add_funds') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'add_funds';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {

                        let numTyp = Number(msg.text);
                        let minAdd = 10;

                        if (numTyp < minAdd) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check + config.HTML_min_add_funds_check, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'add_funds';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let numFondy = Number(msg.text)*100;
                            let payload = helper.getChatId(msg) + Date.now() + 'pay' + numTyp;	// you can use your own payload
                            let step = 'WAIT';
                            let callback_url = `http://165.22.31.179/callback`;
                            helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text, undefined, undefined, undefined, undefined, payload);



                            const merchant_data = JSON.stringify([{
                                chat_id: `${helper.getChatId(msg)}`,
                            }]);

                            let creatSig = `${process.env.Fondy_secretKey}|${numFondy}|RUB|${process.env.Fondy_merchantId}|Toolsigram|${payload}`;

                            let signature = sha1(creatSig);


                            const requestData = {
                                order_id: payload,
                                order_desc: 'Toolsigram',
                                currency: 'RUB',
                                amount: numFondy,
                                server_callback_url: `http://165.22.31.179/callback`,
                                signature: signature,
                                response_url: `https://t.me/Toolsigram_bot`,
                                merchant_data: merchant_data,
                            };


                            const fondy = new CloudIpsp(
                                {
                                    merchantId: process.env.Fondy_merchantId,
                                    secretKey: process.env.Fondy_secretKey
                                }
                            );

                            fondy.Checkout(requestData).then(data => {
                                console.log('1', data.checkout_url);
                                console.log(data);
                                let payBut = [
                                    [
                                        {
                                            text: '✅Пополнить',
                                            callback_data: 'add_funds',
                                            url: `${data.checkout_url}`
                                        }
                                    ],
                                    [
                                        {
                                            text: '❌Отмена',
                                            callback_data: 'cancel'
                                        }
                                    ]
                                ];

                                bot.sendMessage(helper.getChatId(msg), config.HTML_min_add_funds_button + `<strong>${numTyp}</strong>₽  \nПерейдите со ссылке👇👇👇`, {
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: payBut,
                                        resize_keyboard: true
                                    }

                                })
                            }).catch((error) => {
                                console.log(error)
                            });



                        }


                    }
                }


                // Instagram autolike bot
                if (row[0].step === 'instagram_autoLike_bot') {

                    bot.sendMessage(
                        helper.getChatId(msg), config.HTML_76_autoLike_bot_post_old, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                        });

                    step = 'instagram_autoLike_bot_post_old';

                    //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                    helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                }

                if (row[0].step === 'instagram_autoLike_bot_post_old') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_bot_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {

                        console.log('Вы полностью правы!');

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_76_autoLike_bot_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);

                    }


                }

                if (row[0].step === 'instagram_autoLike_bot_post_new') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_76_autoLike_bot_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_bot_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'instagram_autoLike_bot_invoice') {


                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {

                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_autoLike_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_autoLike_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                                    Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram autolike real

                if (row[0].step === 'instagram_autoLike_real') {

                    bot.sendMessage(
                        helper.getChatId(msg), config.HTML_76_autoLike_real_post_old, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                        });

                    step = 'instagram_autoLike_real_post_old';

                    //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                    helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                }

                if (row[0].step === 'instagram_autoLike_real_post_old') {


                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_real_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_76_autoLike_real_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'instagram_autoLike_real_post_new') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_76_autoLike_real_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_real_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }

                }

                if (row[0].step === 'instagram_autoLike_real_invoice') {


                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_autoLike_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_autoLike_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        } else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);

                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_autoLike_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }
                        }

                    }


                }


                // Instagram Bot Followers

                if (row[0].step === 'instagram_followers_bot') {

                    bot.sendMessage(
                        helper.getChatId(msg), config.HTML_90_followers_bot_amount, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                        });

                    step = 'instagram_followers_bot_invoice';


                    helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                }

                if (row[0].step === 'instagram_followers_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_followers_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {

                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_followers_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        } else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_followers_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }


                    }


                }


                // Instagram Real Followers
                if (row[0].step === 'instagram_followers_real') {


                    bot.sendMessage(
                        helper.getChatId(msg), config.HTML_159_followers_real_amount, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                        });

                    step = 'instagram_followers_real_invoice';


                    helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                }

                if (row[0].step === 'instagram_followers_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_followers_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_followers_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        } else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_followers_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].login}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Bot Like
                if (row[0].step === 'instagram_like_bot') {


                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_75_like_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_bot';

                        }
                    });


                }

                if (row[0].step === 'instagram_like_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_like_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_like_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Real Like
                if (row[0].step === 'instagram_like_real') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_169_like_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_real';

                        }
                    });



                }

                if (row[0].step === 'instagram_like_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_like_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_like_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Bot Video
                if (row[0].step === 'instagram_video_bot') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_147_video_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_bot';

                        }
                    });



                }

                if (row[0].step === 'instagram_video_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_video_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_video_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Real Video
                if (row[0].step === 'instagram_video_real') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_148_video_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_real';

                        }
                    });



                }

                if (row[0].step === 'instagram_video_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_video_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_video_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_video_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Stories
                if (row[0].step === 'instagram_stories') {

                    helper.checkUrl(msg.text, 'https://instagram.com/','https://www.instagram.com/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_78_stories_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_stories_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/toolsigram/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_stories';

                        }
                    });


                }

                if (row[0].step === 'instagram_stories_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_stories_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_stories_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_stories_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                //Instagram Stories 30 days
                if (row[0].step === 'instagram_auto_stories30') {

                    helper.checkUrl(msg.text, 'https://instagram.com/','https://www.instagram.com/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_156_auto_saves_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_auto_stories30_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/toolsigram/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_auto_stories30';

                        }
                    });

                }

                if (row[0].step === 'instagram_auto_stories30_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_auto_stories30_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_auto_stories30_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_auto_stories30_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Instagram Saves
                if (row[0].step === 'instagram_saves') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined , undefined,function (result) {

                        if (result === 'ok') {

                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_177_saves_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_saves_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_saves';

                        }
                    });


                }

                if (row[0].step === 'instagram_saves_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_saves_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_saves_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_saves_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }
                    }



                }

                /**
                 // Instagram Auto Saves
                 if (row[0].step === 'instagram_auto_saves') {

                console.log('Введите для новых  = ', row[0].step);

                bot.sendMessage(
                    helper.getChatId(msg), config.HTML_178_auto_saves_amount, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });

                step = 'instagram_auto_saves_invoice';


                helper.switchState(helper.getChatId(msg), step, msg.text);
            }

                 if (row[0].step === 'instagram_auto_saves_invoice') {

                // нужно добавить два параметра новый и старый пост

                let full_p = ((msg.text * row[0].price)).toFixed(2);
                console.log('full_p: ', full_p);


                //записываем кол-во и сумму в базу
                helper.switchState(helper.getChatId(msg), 'instagram_auto_saves_invoice', undefined, msg.text, undefined,full_p);


                console.log('General row: ', row);



                if (row[0].balance >= full_p) {
                    console.log('Выставили счет');

                    bot.sendMessage(
                        helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: 🔥 Instagram
Задание: ${row[0].task}.
Мин. кол-во для заказа: ${row[0].min}
Макс. кол-во для заказа: ${row[0].max}
Цена за 1: ${row[0].price} руб.

Вы заказали: ${msg.text}

К оплате: ${full_p} руб.

Баланс: ${row[0].balance} руб.

Проверьте и подтвердите заказ:⬇️`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {inline_keyboard: kb.pay}
                        });

                }
                else {
                    console.log('на хвататет бабла');

                    //кол-во(amount) последнее сообщение
                    bot.sendMessage(
                        helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: 🔥 Instagram
Задание: ${row[0].task}.
Мин. кол-во для заказа: ${row[0].min}
Макс. кол-во для заказа: ${row[0].max}
Цена за 1: ${row[0].price} руб.

Вы заказали: ${msg.text}

К оплате: ${full_p} руб.

Баланс: ${row[0].balance} руб.

У Вас недостаточно денег для выполнения заказа:⬇️`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {inline_keyboard: kb.add_funds}
                        });
                }


                step = 'wwww';
                //(id, step, link, amount, price)
                helper.switchState(helper.getChatId(msg), step);
                console.log('выставлен чек: ', row);

            }
                 **/

                //Instagram Reach & Impressions
                if (row[0].step === 'instagram_reach_impressions') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined , undefined,function (result) {

                        if (result === 'ok') {

                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_153_reach_impressions_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_reach_impressions_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_reach_impressions';

                        }
                    });


                }

                if (row[0].step === 'instagram_reach_impressions_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_reach_impressions_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_reach_impressions_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_reach_impressions_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }



                //Instagram Likes to comment

                if (row[0].step === 'instagram_like_comment') {

                    helper.checkUrl(msg.text, 'https://instagram.com/p/','https://www.instagram.com/p/' , undefined , undefined,function (result) {

                        if (result === 'ok') {

                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_100_like_comment_login, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_comment_amount';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://instagram.com/p/9ztjgAuS4t/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_comment';

                        }
                    });


                }

                if (row[0].step === 'instagram_like_comment_amount') {

                    bot.sendMessage(
                        helper.getChatId(msg), config.HTML_100_like_comment_amount, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                        });

                    step = 'instagram_like_comment_invoice';


                    helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                }

                if (row[0].step === 'instagram_like_comment_invoice') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'instagram_like_comment_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'instagram_like_comment_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'instagram_like_comment_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для пользователя: <code>${row[0].login}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Instagram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для пользователя: <code>${row[0].login}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }




                }


                //Instagram Comments
                /**
                 if (row[0].step === 'instagram_comments') {
                console.log('Введите количество  = ', row[0].step);

                bot.sendMessage(
                    helper.getChatId(msg), config.HTML_95_comments_amount, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });

                step = 'instagram_comments_amount';

                //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                helper.switchState(helper.getChatId(msg), step, msg.text);
            }

                 if (row[0].step === 'instagram_comments_amount') {
                console.log('Введите для новых  = ', row[0].step);

                bot.sendMessage(
                    helper.getChatId(msg), config.HTML_95_comments_arr, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });

                step = 'instagram_comments_invoice';


                helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined , undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
            }

                 if (row[0].step === 'instagram_comments_invoice') {

                console.log('msg.text: ', msg.text);

                let full_p = ((msg.text * row[0].price)).toFixed(2);
                console.log('full_p: ', full_p);


                //записываем кол-во и сумму в базу
                helper.switchState(helper.getChatId(msg), 'instagram_comments_invoice', undefined, msg.text, undefined,full_p, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);


                console.log('General row: ', row);



                if (row[0].balance >= full_p) {
                    console.log('Выставили счет');

                    bot.sendMessage(
                        helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: 🔥 Instagram
Задание: ${row[0].task}.
Мин. кол-во для заказа: ${row[0].min}
Макс. кол-во для заказа: ${row[0].max}
Цена за 1: ${row[0].price} руб.

Вы заказали: ${msg.text}


К оплате: ${full_p} руб.

Баланс: ${row[0].balance} руб.

Проверьте и подтвердите заказ:⬇️`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {inline_keyboard: kb.pay}
                        });

                }
                else {
                    console.log('на хвататет бабла');

                    //кол-во(amount) последнее сообщение
                    bot.sendMessage(
                        helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: 🔥 Instagram
Задание: ${row[0].task}.
Мин. кол-во для заказа: ${row[0].min}
Макс. кол-во для заказа: ${row[0].max}
Цена за 1: ${row[0].price} руб.

Вы заказали: ${msg.text}


К оплате: ${full_p} руб.

Баланс: ${row[0].balance} руб.

            У Вас недостаточно денег для выполнения заказа:⬇️`,
                        {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {inline_keyboard: kb.add_funds}
                        });
                }


                step = 'wwww';
                //(id, step, link, amount, price)
                helper.switchState(helper.getChatId(msg), step);
                console.log('выставлен чек: ', row);

            }
                 **/


                //TikTok autoLike bot
                if (row[0].step === 'tiktok_autoLike_bot') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , 'https://www.tiktok.com/@' , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_203_tiktok_autoLike_bot_post_old, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_bot_post_old';

                            //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savkoo</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_bot';

                        }
                    });


                }

                if (row[0].step === 'tiktok_autoLike_bot_post_old') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_bot_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_203_tiktok_autoLike_bot_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'tiktok_autoLike_bot_post_new') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_203_tiktok_autoLike_bot_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_bot_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'tiktok_autoLike_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_autoLike_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                //TikTok autoLike real

                if (row[0].step === 'tiktok_autoLike_real') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , 'https://www.tiktok.com/@' , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_204_tiktok_autoLike_real_post_old, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_real_post_old';

                            //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savkoo</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_real';

                        }
                    });



                }

                if (row[0].step === 'tiktok_autoLike_real_post_old') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_real_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_204_tiktok_autoLike_real_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }

                }

                if (row[0].step === 'tiktok_autoLike_real_post_new') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_204_tiktok_autoLike_real_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_real_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }

                }

                if (row[0].step === 'tiktok_autoLike_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_autoLike_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_autoLike_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_autoLike_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: <code>${row[0].post_old}</code>
Для новых: <code>${row[0].post_new}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok Followers Real
                if (row[0].step === 'tiktok_followers_real') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , 'https://www.tiktok.com/@' , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_195_tiktok_followers_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_followers_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savkoo</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_followers_real';

                        }
                    });


                }

                if (row[0].step === 'tiktok_followers_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_followers_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);
                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_followers_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_followers_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok Like bot
                if (row[0].step === 'tiktok_like_bot') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , undefined , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_139_like_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.tiktok.com/@savko/video/6740628009834810629</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_bot';

                        }
                    });



                }

                if (row[0].step === 'tiktok_like_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_like_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_like_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok Like real
                if (row[0].step === 'tiktok_like_real') {


                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_202_like_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.tiktok.com/@savko/video/6740628009834810629</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_real';

                        }
                    });



                }

                if (row[0].step === 'tiktok_like_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_like_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_like_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_like_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok reposts
                if (row[0].step === 'tiktok_reposts') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_163_reposts_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_reposts_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savko/video/6740628009834810629</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_reposts';

                        }
                    });



                }

                if (row[0].step === 'tiktok_reposts_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_reposts_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_reposts_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_reposts_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok Views bot
                if (row[0].step === 'tiktok_views_bot') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , undefined ,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_154_views_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savko/video/6740628009834810629</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_bot';

                        }
                    });



                }

                if (row[0].step === 'tiktok_views_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_views_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_views_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // TikTok Views real
                if (row[0].step === 'tiktok_views_real') {

                    helper.checkUrl(msg.text, 'https://tiktok.com/','https://www.tiktok.com/' , undefined , undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_196_views_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://tiktok.com/@savko/video/6740628009834810629</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_real';

                        }
                    });


                }

                if (row[0].step === 'tiktok_views_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'tiktok_views_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'tiktok_views_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'tiktok_views_real_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 TikTok </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte autolike bot
                if (row[0].step === 'vkontakte_autoLike_bot') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_39_vkontakte_autoLike_bot_post_old, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_bot_post_old';

                            //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_bot';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_autoLike_bot_post_old') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_bot_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_39_vkontakte_autoLike_bot_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'vkontakte_autoLike_bot_post_new') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_bot_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_39_vkontakte_autoLike_bot_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_bot_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }

                }

                if (row[0].step === 'vkontakte_autoLike_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);

                            helper.switchState(helper.getChatId(msg), 'vkontakte_autoLike_bot_invoice', undefined, msg.text, undefined, full_p);

                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: ${row[0].post_old}
Для новых: ${row[0].post_new}

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: ${row[0].post_old}
Для новых: ${row[0].post_new}

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte autolike real
                if (row[0].step === 'vkontakte_autoLike_real') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_40_vkontakte_autoLike_real_post_old, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_real_post_old';

                            //(id, step, link, amount, price) сохранил линку  зпросили старый пост
                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_real';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_autoLike_real_post_old') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_real_post_old';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_40_vkontakte_autoLike_real_post_new, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }


                }

                if (row[0].step === 'vkontakte_autoLike_real_post_new') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_real_post_new';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_40_vkontakte_autoLike_real_amount, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_real_invoice';


                        helper.switchState(helper.getChatId(msg), step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, msg.text);
                    }

                }

                if (row[0].step === 'vkontakte_autoLike_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_autoLike_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_autoLike_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price) * (row[0].post_old + row[0].post_new)).toFixed(2);
                            console.log('full_p = ', full_p);

                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_autoLike_real_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: ${row[0].post_old}
Для новых: ${row[0].post_new}

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                        Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>
Для старых: ${row[0].post_old}
Для новых: ${row[0].post_new}

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>
            
            У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte followers bot
                if (row[0].step === 'vkontakte_followers_bot') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_33_vkontakte_followers_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_bot';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_followers_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_followers_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);

                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_followers_bot_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte followers real
                if (row[0].step === 'vkontakte_followers_real') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_34_vkontakte_followers_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_real';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_followers_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_followers_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_followers_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_followers_real_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte like bot
                if (row[0].step === 'vkontakte_like_bot') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_35_vkontakte_like_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus?w=wall-76477496_38209</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_bot';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_like_bot_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_like_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);

                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_like_bot_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte like real
                if (row[0].step === 'vkontakte_like_real') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_36_vkontakte_like_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/plus?w=wall-76477496_38209</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_real';

                        }
                    });


                }

                if (row[0].step === 'vkontakte_like_real_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_like_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_like_real_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);

                            helper.switchState(helper.getChatId(msg), 'vkontakte_like_real_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte Friends bot
                if (row[0].step === 'vkontakte_friends_bot') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_37_vkontakte_friends_bot_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_friends_bot_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/durov</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_friends_bot';

                        }
                    });



                }

                if (row[0].step === 'vkontakte_friends_bot_invoice') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_friends_bot_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_friends_bot_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);

                            helper.switchState(helper.getChatId(msg), 'vkontakte_friends_bot_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }


                    }


                }

                // VKontakte Friends real
                if (row[0].step === 'vkontakte_friends_real') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_38_vkontakte_like_real_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_friends_real_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/durov</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_friends_real';

                        }
                    });



                }

                if (row[0].step === 'vkontakte_friends_real_invoice') {
                    let numTyp = Number(msg.text);

                    if (numTyp < row[0].min) {
                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_friends_real_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);

                    }
                    else {


                        let full_p = ((msg.text * row[0].price)).toFixed(2);


                        //записываем кол-во и сумму в базу
                        helper.switchState(helper.getChatId(msg), 'vkontakte_friends_real_invoice', undefined, msg.text, undefined, full_p);


                        if (row[0].balance >= full_p) {

                            bot.sendMessage(
                                helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                    reply_markup: {inline_keyboard: kb.pay}
                                });

                        }
                        else {

                            //кол-во(amount) последнее сообщение
                            bot.sendMessage(
                                helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                    reply_markup: {inline_keyboard: kb.add_funds}
                                });
                        }


                        step = 'wwww';
                        //(id, step, link, amount, price)
                        helper.switchState(helper.getChatId(msg), step);
                    }


                }


                // VKontakte Video
                if (row[0].step === 'vkontakte_video') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_161_vkontakte_video_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_video_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/video-76477496_38209</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_video';

                        }
                    });



                }

                if (row[0].step === 'vkontakte_video_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_video_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_video_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_video_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // VKontakte Reposts
                if (row[0].step === 'vkontakte_reposts') {

                    helper.checkUrl(msg.text, 'https://vk.com/','https://www.vk.com/' , 'https://www.vkontakte.com/','https://vkontakte.com/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_45_vkontakte_reposts_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_reposts_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://vk.com/wall-76477496_38209</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_reposts';

                        }
                    });



                }

                if (row[0].step === 'vkontakte_reposts_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'vkontakte_reposts_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'vkontakte_reposts_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'vkontakte_reposts_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 VKontakte </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // FaceBook likePage
                if (row[0].step === 'facebook_likePage') {

                    helper.checkUrl(msg.text, 'https://facebook.com/','https://www.facebook.com/' , undefined,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_42_facebook_likePage_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePage_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.facebook.com/audi/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePage';

                        }
                    });



                }

                if (row[0].step === 'facebook_likePage_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'facebook_likePage_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePage_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'facebook_likePage_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // FaceBook JoinGro
                if (row[0].step === 'facebook_joinGro') {

                    helper.checkUrl(msg.text, 'https://facebook.com/','https://www.facebook.com/' , undefined,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_44_facebook_joinGro_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_joinGro_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.facebook.com/groups/285807801892928/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_joinGro';

                        }
                    });



                }

                if (row[0].step === 'facebook_joinGro_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'facebook_joinGro_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_joinGro_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'facebook_joinGro_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // FaceBook Friends
                if (row[0].step === 'facebook_friends') {

                    helper.checkUrl(msg.text, 'https://facebook.com/','https://www.facebook.com/' , undefined,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_43_facebook_friends_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_friends_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.facebook.com/zuck</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_friends';

                        }
                    });



                }

                if (row[0].step === 'facebook_friends_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'facebook_friends_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_friends_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'facebook_friends_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // FaceBook LikePhPo
                if (row[0].step === 'facebook_likePhPo') {

                    helper.checkUrl(msg.text, 'https://facebook.com/','https://www.facebook.com/' , undefined,undefined,function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_41_facebook_likePhPos_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePhPo_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.facebook.com/aleksandrrevvaofficial/videos/1346619428786452/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePhPo';

                        }
                    });


                }

                if (row[0].step === 'facebook_likePhPo_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'facebook_likePhPo_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'facebook_likePhPo_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'facebook_likePhPo_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 FaceBook </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Odnoklassniki Followers
                if (row[0].step === 'odnoklassniki_followers') {

                    helper.checkUrl(msg.text, 'http://odnoklassniki.ru/','http://www.odnoklassniki.ru/' , 'https://ok.ru/', 'https://www.ok.ru/',function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_145_odnoklassniki_followers_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_followers_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: http://odnoklassniki.ru/group/52311784423583</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_followers';

                        }
                    });


                }

                if (row[0].step === 'odnoklassniki_followers_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'odnoklassniki_followers_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_followers_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'odnoklassniki_followers_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Odnoklassniki Friend
                if (row[0].step === 'odnoklassniki_friends') {

                    helper.checkUrl(msg.text, 'http://odnoklassniki.ru/','http://www.odnoklassniki.ru/' , 'https://ok.ru/', 'https://www.ok.ru/', function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_31_odnoklassniki_friends_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_friends_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://ok.ru/fkirkorov.official</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_friends';

                        }
                    });



                }

                if (row[0].step === 'odnoklassniki_friends_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'odnoklassniki_friends_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_friends_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'odnoklassniki_friends_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Odnoklassniki Like
                if (row[0].step === 'odnoklassniki_like') {

                    helper.checkUrl(msg.text, 'http://odnoklassniki.ru/','http://www.odnoklassniki.ru/' , 'https://ok.ru/', 'https://www.ok.ru/', function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_144_odnoklassniki_like_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_like_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://ok.ru/otserdt/album/54470853722124/834908041228</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_like';

                        }
                    });


                }

                if (row[0].step === 'odnoklassniki_like_invoice') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'odnoklassniki_like_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_like_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            helper.switchState(helper.getChatId(msg), 'odnoklassniki_like_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Odnoklassniki Like
                if (row[0].step === 'odnoklassniki_reposts') {


                    helper.checkUrl(msg.text, 'http://odnoklassniki.ru/','http://www.odnoklassniki.ru/' , 'https://ok.ru/', 'https://www.ok.ru/', function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_146_odnoklassniki_reposts_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_reposts_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://ok.ru/otserdt/album/54470853722124/834908041228</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_reposts';

                        }
                    });



                }

                if (row[0].step === 'odnoklassniki_reposts_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'odnoklassniki_reposts_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'odnoklassniki_reposts_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'odnoklassniki_reposts_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
Соц.сеть: <code>🔥 Odnoklassniki </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Twitter Followers
                if (row[0].step === 'twitter_followers') {

                    helper.checkUrl(msg.text, 'https://twitter.com/','https://www.twitter.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_3_twitter_followers_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_followers_invoice';

                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://twitter.com/durov/</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_followers';

                        }
                    });


                }

                if (row[0].step === 'twitter_followers_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'twitter_followers_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_followers_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'twitter_followers_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 Twitter </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 Twitter </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // Twitter Retweets
                if (row[0].step === 'twitter_retweets') {

                    helper.checkUrl(msg.text, 'https://twitter.com/','https://www.twitter.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_4_twitter_retweets_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_retweets_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://twitter.com/durov/status/733008251466317828</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_retweets';

                        }
                    });



                }

                if (row[0].step === 'twitter_retweets_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'twitter_retweets_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'twitter_retweets_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'twitter_retweets_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 Twitter </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 Twitter </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // YouTube Followers
                if (row[0].step === 'youtube_followers') {

                    helper.checkUrl(msg.text, 'https://youtube.com/','https://www.youtube.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_16_youtube_followers_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_followers_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.youtube.com/user/kvn</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_followers';

                        }
                    });


                }

                if (row[0].step === 'youtube_followers_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'youtube_followers_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_followers_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'youtube_followers_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // YouTube Likes
                if (row[0].step === 'youtube_likes') {

                    helper.checkUrl(msg.text, 'https://youtube.com/','https://www.youtube.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_14_youtube_likes_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_likes_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.youtube.com/watch?v=wsYDuUdj2Ck</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_likes';

                        }
                    });


                }

                if (row[0].step === 'youtube_likes_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'youtube_likes_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_likes_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'youtube_likes_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // YouTube Dislikes
                if (row[0].step === 'youtube_dislikes') {

                    helper.checkUrl(msg.text, 'https://youtube.com/','https://www.youtube.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_15_youtube_dislikes_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_dislikes_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.youtube.com/watch?v=wsYDuUdj2Ck</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_dislikes';

                        }
                    });



                }

                if (row[0].step === 'youtube_dislikes_invoice') {
                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'youtube_dislikes_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_dislikes_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            helper.switchState(helper.getChatId(msg), 'youtube_dislikes_invoice', undefined, msg.text, undefined, full_p);


                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }


                // YouTube Views
                if (row[0].step === 'youtube_views') {

                    helper.checkUrl(msg.text, 'https://youtube.com/','https://www.youtube.com/' , undefined, undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_25_youtube_views_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_views_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример: https://www.youtube.com/watch?v=wsYDuUdj2Ck</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_views';

                        }
                    });



                }

                if (row[0].step === 'youtube_views_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'youtube_views_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'youtube_views_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'youtube_views_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.pay}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 YouTube </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }



                // Telegram follower to chanel
                if (row[0].step === 'HTML_13587_telegram_start') {

                    helper.checkUrl(msg.text, 'https://t.me/','https://t.me/joinchat/' , '@', undefined, function (result) {

                        if (result === 'ok') {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_13587_telegram_start_amount, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'HTML_13587_telegram_start_invoice';


                            helper.switchState(helper.getChatId(msg), step, msg.text);
                        }
                        if (result === 'check_link') {
                            bot.sendMessage(
                                helper.getChatId(msg), `
️<i>❗Проверте ссылку❗️
<code>Пример 1: https://t.me/*******/❗</code>
<code>Пример 2: https://t.me/joinchat/*******/❗</code>
<code>Пример 3: @*******❗</code>
                        </i>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'HTML_13587_telegram_start';

                        }
                    });


                }
                if (row[0].step === 'HTML_13587_telegram_start_invoice') {

                    if (msg.text.replace(/\s/g, '').length === 0 || isNaN(msg.text)) {

                        bot.sendMessage(
                            helper.getChatId(msg), config.HTML_number_check, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });

                        step = 'HTML_13587_telegram_start_invoice';


                        //(id, step, link, amount, price) сохранил старый зпросили новый посту
                        helper.switchState(helper.getChatId(msg), step);
                    }
                    else {
                        let numTyp = Number(msg.text);

                        if (numTyp < row[0].min) {
                            bot.sendMessage(
                                helper.getChatId(msg), config.HTML_min_amount_check+` <code>${row[0].min}</code>`, {
                                    parse_mode: 'HTML',
                                    disable_web_page_preview: true,
                                });

                            step = 'HTML_13587_telegram_start_invoice';


                            //(id, step, link, amount, price) сохранил старый зпросили новый посту
                            helper.switchState(helper.getChatId(msg), step);

                        }
                        else {
                            let full_p = ((msg.text * row[0].price)).toFixed(2);


                            //записываем кол-во и сумму в базу
                            helper.switchState(helper.getChatId(msg), 'HTML_13587_telegram_start_invoice', undefined, msg.text, undefined, full_p);




                            if (row[0].balance >= full_p) {

                                bot.sendMessage(
                                    helper.getChatId(msg), `
            Ссылка: ${row[0].link}
<code>🔥 Telegram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

Проверьте и подтвердите заказ:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.paysmm}
                                    });

                            }
                            else {

                                //кол-во(amount) последнее сообщение
                                bot.sendMessage(
                                    helper.getChatId(msg), `
                 Ссылка: ${row[0].link}
<code>🔥 Telegram </code>
Задание: <code>${row[0].task}.</code>
Мин. кол-во для заказа: <code>${row[0].min} </code>
Макс. кол-во для заказа:<code> ${row[0].max} </code>
Цена за 1:<code> ${row[0].price} руб.</code>

Вы заказали: <code>${msg.text}</code>

К оплате: <code>${full_p} руб.</code>

Баланс: <code>${row[0].balance} руб.</code>

У Вас недостаточно денег для выполнения заказа:⬇️`,
                                    {
                                        parse_mode: 'HTML',
                                        disable_web_page_preview: true,
                                        reply_markup: {inline_keyboard: kb.add_funds}
                                    });
                            }


                            step = 'wwww';
                            //(id, step, link, amount, price)
                            helper.switchState(helper.getChatId(msg), step);
                        }

                    }


                }



                // для адиина кнопки
                if (msg.text === '👥How many users' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    helper.all_user(function (row) {
                        bot.sendMessage(msg.chat.id, `☁️ Зарегистрировано: ${row}`, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                keyboard: keyboard.admin,
                                resize_keyboard: true
                            }

                        })
                    })
                }
                if (msg.text === '💸My balance in likemania' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    social_api.my_balance(function (row) {


                        bot.sendMessage(msg.chat.id, `
                
                ☁️ Баланс: ${row.balance}
☁️ Скидка: ${row.discount}
☁️ Сообщения: ${row.messages}
☁️ Email: ${row.email}
☁️ Ваш ID: ${row.user_id}

                
                `, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                keyboard: keyboard.admin,
                                resize_keyboard: true
                            }

                        })
                    })
                }
                if (msg.text === '📑My task in likemania' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    social_api.my_task(function (row) {

                        for (let i = 0; i < row.length; i++) {

                            bot.sendMessage(msg.chat.id, `

☁️ id: ${row[i].id}
☁️ Соц. сеть: ${row[i].web}
☁️ Цена: ${row[i].price}руб
☁️ Дата: ${row[i].date}
☁️ Сервис id: ${row[i].service_id}
☁️ Прогресс: ${row[i].progress}
☁️ Ссылка: ${row[i].url}
☁️ Количество: ${row[i].amount}шт

                `, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                                reply_markup: {
                                    keyboard: keyboard.admin,
                                    resize_keyboard: true
                                }

                            })
                        }

                    })
                }
                if (msg.text === '💸My balance in smmyt' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    social_api.my_balanceSmm(function (row) {


                        let tojson = JSON.parse(row);

                        bot.sendMessage(msg.chat.id, `
                
                ☁️ Баланс: ${tojson.balance}
☁️ Валюта: ${tojson.currency}

                
                `, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: {
                                keyboard: keyboard.admin,
                                resize_keyboard: true
                            }

                        })
                    })
                }
                if (msg.text === '📑My task in smmyt' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    social_api.my_task(function (row) {

                        for (let i = 0; i < row.length; i++) {

                            bot.sendMessage(msg.chat.id, `

☁️ id: ${row[i].id}
☁️ Соц. сеть: ${row[i].web}
☁️ Цена: ${row[i].price}руб
☁️ Дата: ${row[i].date}
☁️ Сервис id: ${row[i].service_id}
☁️ Прогресс: ${row[i].progress}
☁️ Ссылка: ${row[i].url}
☁️ Количество: ${row[i].amount}шт

                `, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                                reply_markup: {
                                    keyboard: keyboard.admin,
                                    resize_keyboard: true
                                }

                            })
                        }

                    })
                }
                if (msg.text === '📉Live Status' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    bot.sendMessage(helper.getChatId(msg), '🙌 Процесс запущен! ☁️ Авто-стоп через 60 мин');

                    microstats.on('memory', function (value) {

                        bot.sendMessage(
                            msg.chat.id, `☁️--- MEMORY ---
            
☁️ usedpct: ${value.usedpct}
☁️ total: ${value.total}
☁️ free: ${value.free}
            
            `, {
                                reply_markup: {}
                            });

                        console.log('MEMORY:', value);
                    });

                    microstats.on('cpu', function (value) {

                        bot.sendMessage(
                            msg.chat.id, `☁️--- CPU ---
            
☁️ loadpct: ${value.loadpct}
☁️ userpct: ${value.userpct}
☁️ syspct: ${value.syspct}
☁️ idlepct: ${value.idlepct}
            
            `, {
                                reply_markup: {}
                            });

                        console.log('CPU:', value)
                    });


                    //«один раз»: проверит всю статистику, сообщит текущие числа и остановится.
                    let options1 = {frequency: 'once'};
                    //'timer': будет периодически проверять всю статистику по заданному пользователем таймеру и сообщать о каждой проверке.
                    let options2 = {frequency: '5s'};
                    let options3 = {frequency: 'onalert'};
                    //onalert: будет периодически проверять всю статистику, но сообщать только тогда, когда числа превышают определенный пользователем порог.
                    let options4 = {
                        frequency: 'onalert',
                        memoryalert: {used: '>80%'},
                        cpualert: {load: '>70%'},
                        diskalert: { //filesystem: 'C:', //filesystems: ['/dev/disk1', '/dev/disk0s4'],
                            //mount: '/', //mounts: ['/'],
                            used: '>10%'
                        }
                    };

                    let optionsArray = [options4];
                    optionsArray.forEach(function (options) {
                        console.log('---Testing options:', options, '---');
                        microstats.start(options, function (err) {
                            if (err) console.log(err);
                        });
                        setTimeout(function () {
                            microstats.stop();
                        }, 3600000);
                    });

                }
                if (msg.text === '🛑Live Stop' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    microstats.stop();

                    bot.sendMessage(
                        msg.chat.id, `☁️--- microstats stop ---
            
            
            `, {
                            reply_markup: {}
                        });

                }
                if (msg.text === '📊All Status' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    bot.sendMessage(helper.getChatId(msg), '🙌 Процесс запущен! ☁️');

                    let memory_ub;
                    let cpu_ub;


                    microstats.on('memory', function (value) {
                        console.log('MEMORY:', value);

                        memory_ub = `
            
            ☁️ usedpct: ${value.usedpct}
            ☁️ total: ${value.total}
            ☁️ free: ${value.free}`;

                    });

                    microstats.on('cpu', function (value) {
                        console.log('CPU:', value);

                        cpu_ub = `
            
            ☁️ loadpct: ${value.loadpct}
            ☁️ userpct: ${value.userpct}
            ☁️ syspct: ${value.syspct}
            ☁️ idlepct: ${value.idlepct}`;

                    });


                    //«один раз»: проверит всю статистику, сообщит текущие числа и остановится.
                    let options1 = {frequency: 'once'};

                    let optionsArray = [options1];
                    optionsArray.forEach(function (options) {
                        console.log('---Testing options:', options, '---');
                        microstats.start(options, function (err) {
                            if (err) console.log(err);
                        });

                        setTimeout(function () {

                            bot.sendMessage(
                                msg.chat.id, `
            ☁️--- CPU ---
            
            ${cpu_ub}
            
            
☁️--- MEMORY ---
            
            ${memory_ub}
            
            `, {
                                    reply_markup: {}
                                });

                            microstats.stop();
                        }, 10000);
                    });


                }
                if (msg.text === '📣Announcement' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    bot.sendMessage(helper.getChatId(msg), '🙌 Введите сообщение ☁️');

                    helper.switchState(helper.getChatId(msg), 'Announcement');


                }
                if (msg.text === '📢Announcement Preview' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    bot.sendMessage(helper.getChatId(msg), '🙌 Введите сообщение для предпросмотра☁️');

                    helper.switchState(helper.getChatId(msg), 'Announcement_preview');


                }

                if (msg.text === '📢Рефералы' && helper.getChatId(msg).toString() === process.env.Admin_ID) {

                    bot.sendMessage(helper.getChatId(msg), '🙌 Введите рефералку ☁️');

                    helper.switchState(helper.getChatId(msg), 'refarr');


                }



                if (row[0].step === 'refarr') {

                    helper.refArr(msg.text, function (row) {


                        let texti = [];

                        async function processArray() {

                            if (row.length === 0) {
                                bot.sendMessage(helper.getChatId(msg), 'Такой рефералки нету в базе');
                                helper.switchState(helper.getChatId(msg), 'v3');
                            } else {

                                if (row[0].addFunds_t.length === 0) {
                                    bot.sendMessage(helper.getChatId(msg), `По этой рефералке нету пополнейний`);
                                    helper.switchState(helper.getChatId(msg), 'v4');

                                } else {
                                    for (let i = 0; i < row[0].addFunds_t.length; i++) {

                                        await texti.push(`
☁️ Id: ${row[0].id}
☁️ Пополнение на сумму: ${row[0].addFunds_t[i].sum}руб

                `);
                                    }
                                    bot.sendMessage(helper.getChatId(msg), `${texti}`);
                                    helper.switchState(helper.getChatId(msg), 'v3');
                                }
                            }

                        }
                        processArray();




                    });

                }
                if (row[0].step === 'Announcement') {

                    let Announcement = msg.text;

                    helper.announcement(function (row) {

                        for (let i = 0; i < row.length; i++) {

                            bot.sendMessage(row[i].id, Announcement, {
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                            });
                        }
                        helper.switchState(helper.getChatId(msg), 'admin');


                    });


                }
                if (row[0].step === 'Announcement_preview') {

                    bot.sendMessage(process.env.Admin_ID, `${msg.text}`, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    });

                    helper.switchState(helper.getChatId(msg), 'admin');

                }

            }

        }, msg.text);
    }
}