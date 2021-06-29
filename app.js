process.env.NTBA_FIX_319 = 1;
const express = require('express');
//let request = require('request');
const bodyParser = require("body-parser");
const sha1 = require('sha1');
const TelegramBot = require('node-telegram-bot-api');
const microstats = require('microstats');
require('dotenv').config({path: __dirname + '/.env'});
const config = require('./src/html_template');
const helper = require('./src/helper');
const keyboard = require('./src/keyboard');
const kb = require('./src/keyboard_buttons');
const userScheme = require('./models/user.model');
const social_api = require('./social_api');
const CloudIpsp = require('cloudipsp-node-js-sdk');
const needle = require('needle');


const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true,
});


//TODO:  UPDATE Переделать функцию switchState
//TODO:  UPDATE Попробовать передвать параметры обьектом
//TODO:  UPDATE шаблоны текста HTML
//TODO:  UPDATE Схемы монго нужно проработаь, мб в обьект
//TODO:  UPDATE microstats.stop() - разобраться на Live не работает
//TODO:  UPDATE Структурировать проект
//TODO:  UPDATE Сделать поиск через бота @bot search instagram


//TODO:  Платежка под  ROSSKASA
//TODO:  Подключить услугу Telegram
//TODO:  История заказов определять какой сервис LIKEMANIA SMM
//TODO:  Обработать UNDEFINED когда заказ не правильный
//TODO:  в SMM добавлять весь заказ

/**



 Статус обработки заказа. Может содержать следующие значения:
 created — заказ был создан, но клиент еще не ввел платежные реквизиты; необходимо продолжать опрашивать статус заказа
 processing — заказ все еще находится в процессе обработки платежным шлюзом; необходимо продолжать опрашивать статус заказа
 declined — заказ отклонен платежным шлюзом FONDY, внешней платежной системой или банком-эквайером
 approved — заказ успешно совершен, средства заблокированы на счету плательщика и вскоре будут зачислены мерчанту; мерчант может оказывать услугу или “отгружать” товар
 expired — время жизни заказа, указанное в параметре lifetime, истекло.
 reversed — ранее успешная транзакция была полностью отменена. В таком случае параметр reversal_amount будет эквивалентно actual_amount


 */



bot.onText(/\/helps/, (msg, [source, match]) => {

    var Client = require('ssh2').Client;

    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
        conn.exec('uptime', function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', function(data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: '165.22.31.179',
        port: 22,
        username: 'bot',
        privateKey: 'maney1992pk'
    });


});

bot.onText(/\/help/, (msg, [source, match]) => {
    exports.install = function() {

        // Route to views/index
        ROUTE('/');

        // WebSocket route
        WEBSOCKET('/', socket, ['raw']);

    };

    function socket() {

        var self = this;

        self.encodedecode = false;
        self.autodestroy();

        self.on('open', function(client) {

            // Each client will have own terminal
            client.tty = Pty.spawn('/bin/bash', [], { name: 'xterm-color', cols: 80, rows: 24, cwd: process.env.PWD, env: process.env });

            client.tty.on('exit', function(code, signal) {
                // What now?
                client.tty = null;
                client.close();
            });

            client.tty.on('data', function(data) {
                client.send(data);
            });

        });

        self.on('close', function(client) {
            if (client.tty) {
                client.tty.kill(9);
                client.tty = null;
            }
        });

        self.on('message', function(client, msg) {
            client.tty && client.tty.write(msg);
        });
    }


});

/**
 bot.onText(/\/test/, (msg, [source, match]) => {


    const crypto = require("crypto");
    const queryString = require("query-string");
    let request = require("request");
    request.gzip = true;

    const data = {
        shop_id: "C85E637C5F997E4A472DD12FE1CEFD30",
        nonce: 2,
    };

//const sData = "{'shop_id':'C85E637C5F997E4A472DD12FE1CEFD30','nonce':'2'}";
//'"shop_id":"C85E637C5F997E4A472DD12FE1CEFD30","nonce":2}'
 //const queryData = "?shop_id=C85E637C5F997E4A472DD12FE1CEFD30&nonce=2";
 const queryData = queryString.stringify(data, { sort: false });
 const sData = JSON.stringify(data);
 console.log(queryData);

 let apiKey = "O0SrYcjB7I2udfOZ";
 let secretKey = "rABwOixH";

 const sign = crypto
 .createHmac("sha256", apiKey)
 .update(sData, "utf-8")
 .digest("hex");
 //.digest("base64");

 console.log("Sign: " + sign);

 let urlBalance = "https://api.roskassa.net/balance/"
 //+"?"+queryData;
 console.log(urlBalance);

 let headers = {
        Authorization: `Bearer ${sign}`,
        "Content-Type": "application/json",
    };

 request(
 {
            headers: headers,
            url: urlBalance,
            form: data,
            method: "POST",
        },
 function (error, response, body) {
            // body is the decompressed response body
            console.log(
                "server encoded the data as: " +
                (response.headers["content-encoding"] || "identity")
            );
            console.log("the decoded data is: " + body);
        }
 )
 .on("data", function (data) {
            // decompressed data as it is received
            console.log("decoded chunk: " + data);
        })
 .on("response", function (response) {
            // unmodified http.IncomingMessage object
            response.on("data", function (data) {
                // compressed data as it is received
                console.log(data);
                console.log("received " + data.length + " bytes of compressed data");
            });
        });

 });
 **/

app.post("/callback",urlencodedParser, function(request, response){
    response.sendStatus(200);



    let servSign = request.body.signature;
    let peyStatus = request.body.order_status;

    let myObj = request.body;
    delete myObj.signature;

    let keys = [],
        k, i, len;

    let nLen = [process.env.Fondy_secretKey];

    for (k in myObj) {
        if (myObj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }

    keys.sort();

    len = keys.length;

    for (i = 0; i < len; i++) {
        k = keys[i];

        if (myObj[k].length != 0) {

            nLen.push(`|`+myObj[k]);
        }

    }
    let lestLen = nLen.join('');


    let signature = sha1(lestLen);

    let client_id = JSON.parse(request.body.merchant_data);

    let chatID = client_id[0].chat_id;



    if (servSign === signature && peyStatus === 'approved') {

        helper.userCheck(chatID, function (row) {

            let fin_blanc = (row[0].balance + (row[0].add_funds));

            console.log(row[0].add_funds);

            helper.add_funds(chatID, fin_blanc, function (row) {
                console.log(row);
            });


            let order = {
                'sum': row[0].add_funds
            };
            helper.addFundsHist(chatID, order);


            bot.sendMessage(`${chatID}`, config.HTML_add_funds_notif + `${fin_blanc} руб`, {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
                reply_markup: {
                    keyboard: keyboard.homepage,
                    resize_keyboard: true
                }

            }).then(setTimeout(() => {
                bot.sendMessage(chatID, '☁️Выберите нужный Вам раздел ниже:', {
                    reply_markup: {
                        inline_keyboard: kb.homepage
                    }
                })
            }, 700));

            bot.sendMessage(process.env.Admin_ID, `<code>☁️ Серверное сообщение:
💰 ${row[0].add_funds} руб
👤 <b>${chatID}</b>
                </code>`,{
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });

        });

    }
    else if (servSign === signature && peyStatus === 'created') {

        console.log(' created — заказ был создан, но клиент еще не ввел платежные реквизиты; необходимо продолжать опрашивать статус заказа\n');


    }
    else if (servSign === signature && peyStatus === 'processing') {

        console.log(' processing — заказ все еще находится в процессе обработки платежным шлюзом; необходимо продолжать опрашивать статус заказа\n');


    }
    else if (servSign === signature && peyStatus === 'declined') {

        console.log(' declined — заказ отклонен платежным шлюзом FONDY, внешней платежной системой или банком-эквайером\n');


    }
    else if (servSign === signature && peyStatus === 'expired') {

        console.log(' expired — время жизни заказа, указанное в параметре lifetime, истекло.\n');


    }
    else if (servSign === signature && peyStatus === 'reversed') {

        console.log(' reversed — ранее успешная транзакция была полностью отменена. В таком случае параметр reversal_amount будет эквивалентно actual_amount\n');


    }
    else {
        bot.sendMessage(chatID, `Что-то пошло не так 🤔 `, {
            parse_mode: 'HTML',
            reply_markup: {
                resize_keyboard: true
            }

        })
    }


});



bot.on('message', msg => {

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


});

bot.on('callback_query', msg => {

    const {chat, message_id, text} = msg.message;

    let service_id;
    let label;
    let task;
    let request_type;
    let example_text;
    let price;
    let min;
    let max;
    let step;
    let previous_step;


    switch (msg.data) {
        case 'pay':
            helper.template_general(chat.id,message_id,kb.homepage,'☁️ Услуга успешно оплачена', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            helper.userCheck(chat.id, function (rows) {

                console.log('pay');



                console.log('balance -> ', rows[0].balance);
                console.log('sum -> ', rows[0].sum);

                let new_balance = (rows[0].balance - rows[0].sum).toFixed(2);
                //записываем новый баланс и сохраняем в истоию
                helper.balance_man(chat.id, new_balance, function (row) {
                    console.log('balance_man row', row);

                    //запускаем выполнение заказа
                    social_api.sendTask(rows, undefined, function (row) {


                        // отправляем сообщение оплачен и выполняется



                        let orderidarr = [];

                        orderidarr.push({
                            'id': row[0].id,
                            'type': rows[0].request_type,
                            'social': 'likemania',
                        });

                        userScheme.updateMany({id: chat.id }, { $push: { userOrder: orderidarr }}, function (err) {
                            console.log('err', err)
                        });


                        let obj = [];


                        for (let key in row[0]) {

                            obj.push(key + ' : ' + row[0].key);

                        }

                        const opts = {
                            disable_web_page_preview: true
                        };
                        if (row[0].error) {
                            bot.sendMessage(process.env.Admin_ID, `☁️ Серверное сообщение:
                 
                       Ошибка: ${row[0].error}
                       
                       
Ссылка заказа: ${row[1]}
                        
                        `,opts);
                        } else {
                            bot.sendMessage(process.env.Admin_ID, `☁️ Серверное сообщение:
                        
                       Статус: ${row[0].status}
                       Номер заказа ${row[0].id}
                       Цена: ${row[0].price} руб
                       Не оплаченых: ${row[0].not_payed}
                       
                       
                       
Ссылка заказа: ${row[1]}
                        
                        `,opts);
                        }

                    });


                });
            });

            helper.resetUserInfo(chat.id, function (row) {
                console.log(row);
            });
            break;
        case 'paysmm':
            helper.userCheck(chat.id, function (rows) {

                console.log('мы тут');
                let order = {
                    'link': rows[0].link,
                    'post_old': rows[0].post_old,
                    'post_new': rows[0].post_new,
                    'amount': rows[0].amount,
                    'service_id': rows[0].service_id,
                    'task': rows[0].task,
                    'request_type': rows[0].request_type,
                    'price': rows[0].price,
                    'sum': rows[0].sum,
                };
                helper.order(chat.id, order);


                console.log('balance -> ', rows[0].balance);
                console.log('sum -> ', rows[0].sum);

                let new_balance = (rows[0].balance - rows[0].sum).toFixed(2);
                //записываем новый баланс и сохраняем в истоию
                helper.balance_man(chat.id, new_balance, function (row) {
                    console.log('balance_man row', row);

                    //запускаем выполнение заказа
                    social_api.sendTaskSMM(rows, undefined, function (row) {

                        console.log('row in paysmm',row);
                        console.log(rows[0].link);
                        console.log(rows[0].amount);
                        console.log(rows[0].task);
                        console.log(rows[0].text);



                        // отправляем сообщение оплачен и выполняется

                        helper.template_general(chat.id,message_id,kb.homepage,'☁️ Услуга успешно оплачена', function (text, opts) {
                            bot.editMessageText(text, opts);

                        });




                        let orderidarr = [];

                        console.log('1', row);
                        console.log('0', row.order);
                        console.log('2', rows);
                        //let numsid = parseInt(row.replace(/\D+/g,""));

                        if (row.error) {
                            let numsid = parseInt(row.error.replace(/\D+/g,""));

                            console.log(numsid);

                            orderidarr.push({
                                'id': String(numsid),
                                'type': rows[0].request_type,
                                'social': 'smmyt',
                                'link':rows[0].link,
                                'amount':rows[0].amount,
                                'task':rows[0].task,
                                'web':rows[0].text,
                            });
                        } else {
                            orderidarr.push({
                                'id': String(row.order),
                                'type': rows[0].request_type,
                                'social': 'smmyt',
                                'link':rows[0].link,
                                'amount':rows[0].amount,
                                'task':rows[0].task,
                                'web':rows[0].text,
                            });
                        }



                        userScheme.updateMany({id: chat.id }, { $push: { userOrder: orderidarr }}, function (err) {
                            console.log('err', err)
                        });



                        bot.sendMessage(process.env.Admin_ID, `☁️ Серверное сообщение:
                        
                        ${row}
                        
                        `);
                    });


                });
            });
            helper.resetUserInfo(chat.id, function (row) {
                console.log(row);
            });
            break;
        case 'CreateRef':

            helper.template_general(chat.id,message_id,kb.create_ref,`☁️<code> <b>Поделитесь ссылкой со своими друзьями и зарабатывайте 10% с каждой покупки друга!\n</b></code>
☁️ <b>Заработанную сумму Вы сможете потратить на раскрутку Вашей группы, аккаунта или канала либо вывести на электронный кошелёк, вывод может занимать до 72 часов😉</b>`, function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'CreateRef';
            previous_step = 'Профиль_';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case 'clientRefs':

            console.log('chat.id', chat.id);
            helper.refArr(chat.id, function (row) {
                console.log('длинна', row.length);


                let texti = [];

                async function processArray() {
                    step = 'clientRefs_';
                    previous_step = 'CreateRef_';
                    helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

                    if (row.length === 0) {
                        helper.template_general(chat.id,message_id,kb.back,`Вы еще не привели друзей 🙁`, function (text, opts) {
                            bot.editMessageText(text, opts);

                        });

                    } else {

                        if (row[0].addFunds_t.length === 0) {
                            helper.template_general(chat.id,message_id,kb.back,`Зарегистрировано ${row.length}\n Пополнений: 0`, function (text, opts) {
                                bot.editMessageText(text, opts);

                            });
                              }

                        else {

                            let fundHowMutch = function (addFundsHow, cb) {

                                let refFund = 0;
                                for (let i = 0; i < addFundsHow.length; i++) {
                                    refFund = refFund + addFundsHow[i].sum;
                                }
                                cb(refFund);

                            }

                            fundHowMutch(row[0].addFunds_t, function (rowz) {
                                helper.template_general(chat.id,message_id,kb.back,`Cумма пополнений ваших рефералов: <code>${rowz}</code> руб,\nВаш заработорк: <code>${(rowz*10)/100}</code> руб\nНапишите в <a href="${process.env.Support_ID}">Support</a> для вывода средств`, function (text, opts) {
                                    bot.editMessageText(text, opts);

                                });

                               })



                        }
                    }

                }
                processArray();



            });


            break;
        case 'takeRef':

            let linkRef = `https://t.me/toolsigram_bot?start=${chat.id}`;

            helper.template_general(chat.id,message_id,kb.back,`☁️ Твоя ссылка:\n ${linkRef} `, function (text, opts) {
                bot.editMessageText(text, opts);

            });

            bot.sendMessage(process.env.Admin_ID, `<code>☁️ Серверное сообщение:
Создана рефералка
👤 <i>${linkRef}</i>
                </code>`,{
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });

            step = 'takeRef';
            previous_step = 'CreateRef_';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case 'back':

            helper.userCheck(chat.id, function (row) {
                console.log(row[0].previous_step)

                if (row[0].previous_step === 'Главное меню') {

                    helper.template_general(chat.id, message_id, kb.homepage, `<b>☁️Выберите нужный Вам раздел ниже:</b>`, function (text, opts) {
                        bot.editMessageText(text, opts);

                    });

                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

                if (row[0].previous_step === 'Заказ') {



                    helper.template_general(chat.id, message_id, kb.select_social, '☁️ Выберите платформу:️', function (text, opts) {
                        bot.editMessageText(text, opts);

                    });


                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

                if (row[0].previous_step === 'Профиль_') {


                    userScheme.find({id: msg.from.id}, function (err, rows) {
                        if (err) {
                            console.log(err)
                        } else {

                            helper.template_general(chat.id,message_id,kb.profile,`<b>💰Баланс - ${rows[0].balance} руб.\n</b>` +
                                `<b>Ваш ID - ${chat.id}</b>`, function (text, opts) {
                                bot.editMessageText(text, opts);

                            });


                        }
                    });


                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

                if (row[0].previous_step === 'Faq_') {


                    helper.template_general(chat.id, message_id, kb.help, '⁉️️Помощь:', function (error,text, opts) {

                    });

                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

                if (row[0].previous_step === 'CreateRef_') {


                    helper.template_general(chat.id,message_id,kb.create_ref,`☁️<code> <b>Поделитесь ссылкой со своими друзьями и зарабатывайте 10% с каждой покупки друга!\n</b></code>
☁️ <b>Заработанную сумму Вы сможете потратить на раскрутку Вашей группы, аккаунта или канала либо вывести на электронный кошелёк, вывод может занимать до 72 часов😉</b>`, function (text, opts) {
                        bot.editMessageText(text, opts);

                    });

                    step = 'CreateRef_';
                    previous_step = 'Профиль_';
                    helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);                    } else {


                }

                if (row[0].previous_step === 'История заказов_') {


                    helper.userCheck(msg.from.id, function (row) {

                        console.log('длинна userOrder: ',row[0].userOrder.length);

                        if (row[0].userOrder.length === 0) {

                            const opts = {
                                chat_id: chat.id,
                                message_id: message_id,
                                parse_mode: 'HTML',
                                disable_web_page_preview: true,
                                reply_markup: JSON.stringify({
                                    inline_keyboard: kb.back

                                })

                            };

                            helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`, function (text, opts) {
                                bot.editMessageText(text, opts);

                            });
                        }
                        else {

                            async function processfinishTaskArrArray1(cb) {
                                let arrHistOrd = [];
                                let texti = [];

                                for (let i = 0; i < row[0].userOrder.length; i++) {

                                    console.log('social', row[0].userOrder[i].social);

                                    if (row[0].userOrder[i].social === 'likemania') {
                                        console.log('likemania');
                                        let likemania = `https://likemania.com/api2/task/${row[0].userOrder[i].id}/?key=a33qPBvcDLbRqEdG`;

                                        await needle('post', likemania)
                                            .then(async function (resp) {

                                                if (resp.body.current === resp.body.amount) {
                                                    await arrHistOrd.push(resp.body);
                                                    await helper.deleteOrder(chat.id, row[0].userOrder[i].id)
                                                } else {
                                                    await texti.push(resp.body);

                                                }


                                                /**


                                                 arrHistOrd.push({
'Номер заказа': resp.body.id,
'Прогрес': resp.body.progress,
'Дата': resp.body.date,
'Соц.сеть': resp.body.web,
'Задача': resp.body.name,
'Ссылка': resp.body.url,
'Заказано': resp.body.amount,
'Выполнено': resp.body.current,
                                   });

                                                 **/
                                            })
                                            .catch(function (err) {
                                                console.log(err)
                                            });
                                    }

                                    if (row[0].userOrder[i].social === 'smmyt') {

                                        console.log('smmyt');


                                        let smmyt = `https://smmyt.ru/api/v2/?key=${process.env.Smmyt_TOKEN}&action=status&order=${row[0].userOrder[i].id}`;

                                        await needle('post', smmyt)
                                            .then(async function (resp) {
                                                let parsAnswer = JSON.parse(resp.body)
                                                console.log('1в переборе срабьотало',parsAnswer.status);
                                                console.log('1в переборе срабьотало',parsAnswer);
                                                console.log('1в переборе срабьотало row',row[0].userOrder);
                                                let d = new Date();
                                                let s = d.toLocaleDateString('ru-RU', { month: '2-digit', day: '2-digit', year: 'numeric' ,hour: '2-digit', minute: '2-digit'});

                                                console.log(s);


                                                let parsAnswerObj = {
                                                    id: row[0].userOrder[i].id,
                                                    progress: parsAnswer.status,
                                                    web: row[0].userOrder[i].web,
                                                    name: row[0].userOrder[i].task,
                                                    amount: row[0].userOrder[i].amount,
                                                    url: row[0].userOrder[i].link,
                                                    current:row[0].userOrder[i].amount,
                                                    date:s

                                                }

                                                console.log('parsAnswerObj',parsAnswerObj);


                                                if (parsAnswer.status === 'Completed') {
                                                    await arrHistOrd.push(parsAnswerObj);
                                                    await helper.deleteOrder(chat.id, row[0].userOrder[i].id)
                                                } if (parsAnswer.status === 'In progress') {
                                                    await texti.push(parsAnswerObj);

                                                }


                                                /**


                                                 arrHistOrd.push({
'Номер заказа': resp.body.id,
'Прогрес': resp.body.progress,
'Дата': resp.body.date,
'Соц.сеть': resp.body.web,
'Задача': resp.body.name,
'Ссылка': resp.body.url,
'Заказано': resp.body.amount,
'Выполнено': resp.body.current,
                                   });

                                                 **/
                                            })
                                            .catch(function (err) {
                                                console.log(err)
                                            });
                                    }



                                }
                                //cb(arrHistOrd);
                                helper.order(chat.id, arrHistOrd);
                                cb(texti);
                            }

                            processfinishTaskArrArray1(function (row) {
                                console.log(' История заказов row: ',row);

                                let textis = [];

                                if (row.length === 0) {
                                    console.log('---- 0000 ------');
                                    helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                        bot.editMessageText(text, opts);

                                    });
                                }
                                else {
                                    console.log('---- else ------');

                                    let array = row;
                                    let size = 10; //размер подмассива
                                    let subarray = []; //массив в который будет выведен результат.
                                    let rowLen;

                                    if (row.length !== 0) {
                                        rowLen = JSON.stringify(array)
                                        for (let i = 0; i <Math.ceil(array.length/size); i++){
                                            subarray[i] = array.slice((i*size), (i*size) + size);
                                        }
                                    }



                                    if (rowLen.length > 4096) {

                                        console.log('---- 22222------');

                                        let parsfinishTasksArr = async function (arr, cb) {

                                            for (let i = 0; i < arr.length; i++) {
                                                await cb(arr[i]);

                                            }


                                        }

                                        parsfinishTasksArr(subarray, function (arrTex) {

                                            async function procLongaMesssz(arrTex,cb) {
                                                let texti = [];
                                                let arrHistOrd = [];

                                                for (let i = 0; i < arrTex.length; i++) {

                                                    await  texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `);
                                                }
                                                cb(texti);

                                            }
                                            procLongaMesssz(arrTex,function (row) {

                                                bot.sendMessage(
                                                    chat.id, `${row}`, {
                                                        parse_mode: 'HTML',disable_web_page_preview: true,
                                                    });


                                            });
                                        })

                                    }
                                    if (rowLen.length < 4096) {
                                        console.log('---- 33333------');

                                        let parsfinishTaskaArr = async function (arr, cb) {

                                            for (let i = 0; i < arr.length; i++) {
                                                await cb(arr[i]);

                                            }


                                        }

                                        parsfinishTaskaArr(subarray, function (arrTex) {

                                            async function procLongaMesssz(arrTex,cb) {
                                                let texti = [];
                                                let arrHistOrd = [];

                                                for (let i = 0; i < arrTex.length; i++) {

                                                    await  texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `);
                                                }
                                                cb(texti);

                                            }
                                            procLongaMesssz(arrTex,function (row) {
                                                helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                                    bot.editMessageText(text, opts);

                                                });


                                            });
                                        })

                                    }
                                    if (rowLen.length === 0) {
                                        console.log('норм');
                                        console.log('row',row);
                                        console.log('subarray',subarray);

                                        let finisherTasksArrArrz = async function (arr, cb) {

                                            for (let i = 0; i < arr.length; i++) {
                                                await cb(arr[i]);

                                            }


                                        }

                                        finisherTasksArrArrz(subarray, function (arrTex) {

                                            async function finishTaskArrLongesMessz(arrTex,cb) {
                                                let texti = [];
                                                let arrHistOrd = [];

                                                for (let i = 0; i < arrTex.length; i++) {

                                                    if (arrTex[i].current === arrTex[i].amount) {
                                                        await arrHistOrd.push(arrTex[i]);

                                                        helper.deleteOrder(chat.id, arrTex[i].id)
                                                    } else {
                                                        await texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `)

                                                    }
                                                }
                                                cb(texti);

                                                helper.order(chat.id, arrHistOrd);
                                            }
                                            finishTaskArrLongesMessz(arrTex,function (row) {

                                                helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                                    bot.editMessageText(text, opts);

                                                });

                                            });


                                        })
                                    }
                                }



                            });


                        }

                        step = 'История заказов_';
                        previous_step = 'Профиль_';
                        helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);
                    });


                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

                if (row[0].previous_step === 'Faq_') {


                    helper.template_general(chat.id, message_id, kb.help, '⁉️️Помощь:', function (text, opts) {
                        bot.editMessageText(text, opts);

                    });

                    helper.resetUserInfo(chat.id, function (row) {
                        console.log(row);
                    });

                }

            })



            break;
        case 'cancel':
            helper.resetUserInfo(chat.id, function (row) {
                console.log(row);
            });

            helper.template_general(chat.id, message_id, kb.homepage, '<b>☁️Выберите нужный Вам раздел ниже:</b>️', function (text, opts) {
                bot.editMessageText(text, opts);

            });



            break;
        case 'профиль':
            userScheme.find({id: msg.from.id}, function (err, rows) {
                if (err) {
                    console.log(err)
                } else {

                    helper.template_general(chat.id,message_id,kb.profile,`<b>💰Баланс - ${rows[0].balance} руб.\n</b>` +
                        `<b>Ваш ID - ${chat.id}</b>`, function (text, opts) {
                        bot.editMessageText(text, opts);

                    });


                }
            });

            step = 'Профиль_';
            previous_step = 'Главное меню';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case 'faq':

            helper.template_general(chat.id, message_id, kb.help, '⁉️️Помощь:', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'faq';
            previous_step = 'Главное меню';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);


            break;
        case 'Instructions':

            let text = 'https://telegra.ph/Kak-dobavit-zadanie-v-bot-02-01';
            const opts = {
                chat_id: chat.id,
                message_id: message_id,
                parse_mode: 'HTML',
                reply_markup: JSON.stringify({
                    inline_keyboard: kb.back

                })

            };


            bot.editMessageText(text, opts);

            step = 'Instructions';
            previous_step = 'Faq_';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);



            break;
        case 'finishTask':

            helper.userCheck(msg.from.id, function (row) {


                if (row[0].userOrder_t.length === 0) {

                    const opts = {
                        chat_id: chat.id,
                        message_id: message_id,
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                        reply_markup: JSON.stringify({
                            inline_keyboard: kb.back

                        })

                    };


                    bot.editMessageText(`На данны момент выполненных заданий нету`, opts);

                }
                else {

                    async function finishTasksArr(cb) {
                        let arrHistOrd = [];
                        let texti = [];

                        for (let i = 0; i < row[0].userOrder_t.length; i++) {


                            await arrHistOrd.push(row[0].userOrder_t[i]);
                        }
                        cb(arrHistOrd);
                        //callback(texti);
                    }

                    finishTasksArr(function (row) {


                        let array = row;
                        let size = 10; //размер подмассива
                        let subarray = []; //массив в который будет выведен результат.
                        for (let i = 0; i <Math.ceil(array.length/size); i++){
                            subarray[i] = array.slice((i*size), (i*size) + size);
                        }
                        //console.log(subarray);


                        let textis = [];

                        let rowLen = JSON.stringify(subarray)



                        if (rowLen.length > 4096) {

                            let finishTaskArrparsArr = async function (arr, cb) {

                                for (let i = 0; i < arr.length; i++) {
                                    await cb(arr[i]);

                                }


                            }

                            finishTaskArrparsArr(subarray, function (arrTex) {

                                async function procLongMessfinishTaskArr(arrTex,cb) {
                                    let texti = [];

                                    for (let i = 0; i < arrTex.length; i++) {

                                        await  texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `);
                                    }
                                    cb(texti);
                                }
                                procLongMessfinishTaskArr(arrTex,function (row) {

                                    bot.sendMessage(
                                        chat.id, `${row}`, {
                                            parse_mode: 'HTML',disable_web_page_preview: true,
                                        });

                                });




                            })


                        }
                        else {
                            console.log('ноль');

                            let parsfinishTaskArrArrz = async function (arr, cb) {

                                for (let i = 0; i < arr.length; i++) {
                                    await cb(arr[i]);

                                }


                            }

                            parsfinishTaskArrArrz(subarray, function (arrTex) {


                                async function procfinishTaskArrLongMessz(arrTex,cb) {
                                    let texti = [];
                                    let arrHistOrd = [];

                                    console.log('arrTexarr_____',arrTex);

                                    for (let i = 0; i < arrTex.length; i++) {
                                        await texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `)


                                    }
                                    cb(texti);

                                }
                                procfinishTaskArrLongMessz(arrTex,function (row) {

                                    helper.template_general(chat.id, message_id, kb.back, `<b>☁️Выполненные задания:\n</b>`+`${row}`, function (text, opts) {
                                        bot.editMessageText(text, opts);

                                    });

                                });
                            })
                        }

                    });

                }

                step = 'finishTask_';
                previous_step = 'История заказов_';
                helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);
            });

            break;
        case 'История заказов':

            helper.userCheck(msg.from.id, function (row) {

                console.log('длинна userOrder: ',row[0].userOrder.length);

                if (row[0].userOrder.length === 0) {

                    const opts = {
                        chat_id: chat.id,
                        message_id: message_id,
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                        reply_markup: JSON.stringify({
                            inline_keyboard: kb.back

                        })

                    };

                    helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`, function (text, opts) {
                        bot.editMessageText(text, opts);

                    });
                }
                else {

                    async function processfinishTaskArrArray1(cb) {
                        let arrHistOrd = [];
                        let texti = [];

                        for (let i = 0; i < row[0].userOrder.length; i++) {

                            console.log('social', row[0].userOrder[i].social);

                            if (row[0].userOrder[i].social === 'likemania') {
                                console.log('likemania');
                                let likemania = `https://likemania.com/api2/task/${row[0].userOrder[i].id}/?key=a33qPBvcDLbRqEdG`;

                                await needle('post', likemania)
                                    .then(async function (resp) {

                                        if (resp.body.current === resp.body.amount) {
                                            await arrHistOrd.push(resp.body);
                                            await helper.deleteOrder(chat.id, row[0].userOrder[i].id)
                                        } else {
                                            await texti.push(resp.body);

                                        }


                                        /**


                                         arrHistOrd.push({
'Номер заказа': resp.body.id,
'Прогрес': resp.body.progress,
'Дата': resp.body.date,
'Соц.сеть': resp.body.web,
'Задача': resp.body.name,
'Ссылка': resp.body.url,
'Заказано': resp.body.amount,
'Выполнено': resp.body.current,
                                   });

                                         **/
                                    })
                                    .catch(function (err) {
                                        console.log(err)
                                    });
                            }

                            if (row[0].userOrder[i].social === 'smmyt') {

                                console.log('smmyt');


                                let smmyt = `https://smmyt.ru/api/v2/?key=${process.env.Smmyt_TOKEN}&action=status&order=${row[0].userOrder[i].id}`;

                                await needle('post', smmyt)
                                    .then(async function (resp) {
                                        let parsAnswer = JSON.parse(resp.body)
                                        console.log('2в переборе срабьотало',parsAnswer.status);
                                        console.log('2в переборе срабьотало',parsAnswer);
                                        console.log('2в переборе срабьотало row',row[0].userOrder[i]);

                                        let d = new Date();
                                        let s = d.toLocaleDateString('ru-RU', { month: '2-digit', day: '2-digit', year: 'numeric' ,hour: '2-digit', minute: '2-digit'});

                                        console.log(s);

                                        let parsAnswerObj = {
                                            id: row[0].userOrder[i].id,
                                            progress: parsAnswer.status,
                                            web: row[0].userOrder[i].web,
                                            name: row[0].userOrder[i].task,
                                            amount: row[0].userOrder[i].amount,
                                            url: row[0].userOrder[i].link,
                                            current:row[0].userOrder[i].amount,
                                            date:s

                                        }

                                        console.log('parsAnswerObj',parsAnswerObj);


                                        if (parsAnswer.status === 'Completed') {
                                            await arrHistOrd.push(parsAnswerObj);
                                            console.log('000-',chat.id, row[0].userOrder[i].id);
                                            await helper.deleteOrder(chat.id, row[0].userOrder[i].id)
                                        } if (parsAnswer.status === 'In progress') {
                                            await texti.push(parsAnswerObj);

                                        }


                                        /**


                                         arrHistOrd.push({
'Номер заказа': resp.body.id,
'Прогрес': resp.body.progress,
'Дата': resp.body.date,
'Соц.сеть': resp.body.web,
'Задача': resp.body.name,
'Ссылка': resp.body.url,
'Заказано': resp.body.amount,
'Выполнено': resp.body.current,
                                   });

                                         **/
                                    })
                                    .catch(function (err) {
                                        console.log(err)
                                    });
                            }



                        }
                        //cb(arrHistOrd);
                        helper.order(chat.id, arrHistOrd);
                        cb(texti);
                    }

                    processfinishTaskArrArray1(function (row) {
                        console.log(' История заказов row: ',row);

                        let textis = [];

                        if (row.length === 0) {
                            console.log('---- 0000 ------');
                            helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                bot.editMessageText(text, opts);

                            });
                        }
                        else {
                            console.log('---- else ------');

                            let array = row;
                            let size = 10; //размер подмассива
                            let subarray = []; //массив в который будет выведен результат.
                            let rowLen;

                            if (row.length !== 0) {
                                rowLen = JSON.stringify(array)
                                for (let i = 0; i <Math.ceil(array.length/size); i++){
                                    subarray[i] = array.slice((i*size), (i*size) + size);
                                }
                            }



                            if (rowLen.length > 4096) {

                                console.log('---- 22222------');

                                let parsfinishTasksArr = async function (arr, cb) {

                                    for (let i = 0; i < arr.length; i++) {
                                        await cb(arr[i]);

                                    }


                                }

                                parsfinishTasksArr(subarray, function (arrTex) {

                                    async function procLongaMesssz(arrTex,cb) {
                                        let texti = [];
                                        let arrHistOrd = [];

                                        for (let i = 0; i < arrTex.length; i++) {

                                            await  texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `);
                                        }
                                        cb(texti);

                                    }
                                    procLongaMesssz(arrTex,function (row) {

                                        bot.sendMessage(
                                            chat.id, `${row}`, {
                                                parse_mode: 'HTML',disable_web_page_preview: true,
                                            });


                                    });
                                })

                            }
                            if (rowLen.length < 4096) {
                                console.log('---- 33333------');

                                let parsfinishTaskaArr = async function (arr, cb) {

                                    for (let i = 0; i < arr.length; i++) {
                                        await cb(arr[i]);

                                    }


                                }

                                parsfinishTaskaArr(subarray, function (arrTex) {

                                    async function procLongaMesssz(arrTex,cb) {
                                        let texti = [];
                                        let arrHistOrd = [];

                                        for (let i = 0; i < arrTex.length; i++) {

                                            await  texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `);
                                        }
                                        cb(texti);

                                    }
                                    procLongaMesssz(arrTex,function (row) {
                                        helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                            bot.editMessageText(text, opts);

                                        });


                                    });
                                })

                            }
                            if (rowLen.length === 0) {
                                console.log('норм');
                                console.log('row',row);
                                console.log('subarray',subarray);

                                let finisherTasksArrArrz = async function (arr, cb) {

                                    for (let i = 0; i < arr.length; i++) {
                                        await cb(arr[i]);

                                    }


                                }

                                finisherTasksArrArrz(subarray, function (arrTex) {

                                    async function finishTaskArrLongesMessz(arrTex,cb) {
                                        let texti = [];
                                        let arrHistOrd = [];

                                        for (let i = 0; i < arrTex.length; i++) {

                                            if (arrTex[i].current === arrTex[i].amount) {
                                                await arrHistOrd.push(arrTex[i]);

                                                helper.deleteOrder(chat.id, arrTex[i].id)
                                            } else {
                                                await texti.push(`
Номер заказа: ${arrTex[i].id},
Прогрес: ${arrTex[i].progress},
Дата: ${arrTex[i].date},
Соц.сеть: ${arrTex[i].web},
Задача: ${arrTex[i].name},
Ссылка: ${arrTex[i].url},
Заказано: ${arrTex[i].amount},
Выполнено: ${arrTex[i].current}
                                    `)

                                            }
                                        }
                                        cb(texti);

                                        helper.order(chat.id, arrHistOrd);
                                    }
                                    finishTaskArrLongesMessz(arrTex,function (row) {

                                        helper.template_general(chat.id, message_id, kb.taskbutton, `<b>☁️Активные задания:\n</b>`+`${row}`, function (text, opts) {
                                            bot.editMessageText(text, opts);

                                        });

                                    });


                                })
                            }
                        }



                    });


                }

                step = 'История заказов_';
                previous_step = 'Профиль_';
                helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);
            });

            break;
        case 'История пополнения':

            helper.userCheck(msg.from.id, function (rows) {


                if (rows[0].addFunds_t.length === 0) {
                    helper.template_general(chat.id, message_id, kb.back, `Вы еще не пополняли счет`, function (text, opts) {
                        bot.editMessageText(text, opts);

                    });

                }
                else {

                    async function processArrayq(cb) {
                        let texti = [];

                        for (let i = 0; i < rows[0].addFunds_t.length; i++) {

                            texti.push(`
☁️ Пополнение на сумму: ${rows[0].addFunds_t[i].sum}руб

                `);
                        }
                        cb(texti);
                    }
                    processArrayq(function (row) {


                        console.log('row_len',row.length);

                        let array = row;
                        let size = 50; //размер подмассива
                        let subarray = []; //массив в который будет выведен результат.
                        for (let i = 0; i <Math.ceil(array.length/size); i++){
                            subarray[i] = array.slice((i*size), (i*size) + size);
                        }
                        let rowLen = JSON.stringify(subarray)

                        //console.log('subarray',subarray);
                        console.log('subarray len',rowLen.length);

                        if (rowLen.length < 3800) {

                            console.log('меньше');


                            helper.template_general(chat.id, message_id, kb.back, `${row}`, function (text, opts) {
                                bot.editMessageText(text, opts);

                            });
                        } else {
                            console.log('больше');


                            let finishFoundsArrparsArr = async function (arr, cb) {

                                for (let i = 0; i < arr.length; i++) {
                                    await cb(arr[i]);

                                }


                            }

                            finishFoundsArrparsArr(subarray, function (arrTex) {
                                console.log('arrTex',arrTex);

                                bot.sendMessage(
                                    chat.id, `${arrTex}`, {
                                        parse_mode: 'HTML',disable_web_page_preview: true,
                                        reply_markup: {
                                            inline_keyboard: kb.back
                                        }
                                    });





                            })

                        }



                    });
                }

                step = 'История пополнения_';
                previous_step = 'Профиль_';
                helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            });


            break;
        case 'На главную':
            helper.resetUserInfo(chat.id, function (row) {
                console.log(row);
            });

            helper.template_general(chat.id, message_id, kb.homepage, '<b>☁️Выберите нужный Вам раздел ниже:</b>', function (text, opts) {
                bot.editMessageText(text, opts);

            });



            break;
        case 'заказ':

            helper.template_general(chat.id, message_id, kb.select_social, '☁️ Выберите платформу:️', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'заказ';
            previous_step = 'Главное меню';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);


            break;
        case 'Instagram':

            helper.template_general(chat.id, message_id, kb.instagram_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Instagram" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Instagram_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case 'Telegram':

            helper.template_general(chat.id, message_id, kb.telegram_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Telegram" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Telegram_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case '13587':


            helper.template_general(chat.id, message_id, undefined, config.HTML_13587_telegram_start, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 13587;
            label = "Telegram";
            task = "Подписчики на канал Телеграм: Старт - 0.8руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 0.8;
            min = 250;
            max = 100000000;
            step = 'HTML_13587_telegram_start';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '76':


            helper.template_general(chat.id, message_id, undefined, config.HTML_76_autoLike_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });

            service_id = 76;
            label = "укажите логин в instagram";
            task = "Боты Авто лайки + просмотры - 0.27руб/шт";
            request_type = "subscribe";
            example_text = "durov";
            price = 0.27;
            min = 10;
            max = 20000;
            step = 'instagram_autoLike_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '170':
            helper.template_general(chat.id, message_id, undefined, config.HTML_76_autoLike_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 170;
            label = "укажите логин в instagram";
            task = "Люди Авто лайки + просмотры - 0.33руб/шт";
            request_type = "subscribe";
            example_text = "durov";
            price = 0.33;
            min = 10;
            max = 25000;
            step = 'instagram_autoLike_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '90':
            helper.template_general(chat.id, message_id, undefined, config.HTML_90_followers_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 90;
            label = "укажите логин в instagram";
            task = "Bot Followers - 0,70руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 0.70;
            min = 10;
            max = 5000;
            step = 'instagram_followers_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '159':
            helper.template_general(chat.id, message_id, undefined, config.HTML_159_followers_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 159;
            label = "укажите логин в instagram";
            task = "Real Followers - 2руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 2;
            min = 10;
            max = 100000;
            step = 'instagram_followers_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '75':
            helper.template_general(chat.id, message_id, undefined, config.HTML_75_like_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });

            service_id = 75;
            label = "укажите ссылку на фото";
            task = "Bot Likes - 0,27руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.27;
            min = 10;
            max = 20000;
            step = 'instagram_like_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '169':
            helper.template_general(chat.id, message_id, undefined, config.HTML_169_like_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 169;
            label = "укажите ссылку на фото";
            task = "Real Likes - 0,33руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.33;
            min = 10;
            max = 25000;
            step = 'instagram_like_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '147':
            helper.template_general(chat.id, message_id, undefined, config.HTML_147_video_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 147;
            label = "укажите ссылку на видео";
            task = "Просмотры видео боты - 0,06руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.06;
            min = 100;
            max = 1000000;
            step = 'instagram_video_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '148':
            helper.template_general(chat.id, message_id, undefined, config.HTML_148_video_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 148;
            label = "укажите ссылку на видео";
            task = "Просмотры видео Люди - 0,07руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.07;
            min = 100;
            max = 1000000;
            step = 'instagram_video_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '78':
            helper.template_general(chat.id, message_id, undefined, config.HTML_78_stories, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 78;
            label = "укажите логин в instagram";
            task = "Просмотры stories - 0,12руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.12;
            min = 250;
            max = 6000;
            step = 'instagram_stories';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '177':
            helper.template_general(chat.id, message_id, undefined, config.HTML_177_saves, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 177;
            label = "укажите ссылку на фото";
            task = "Сохранения - 0,12руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.12;
            min = 100;
            max = 80000;
            step = 'instagram_saves';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        /**
         case '178':
         bot.sendMessage(
         chat.id, config.HTML_178_auto_saves, {
                    parse_mode: 'HTML',disable_web_page_preview: true,
                });
         service_id = 178;
         label = "укажите ссылку на фото";
         task = "Сохранения 0.06руб/шт";
         request_type = "subscribe";
         example_text = "https://instagram.com/p/9ztjgAuS4t/";
         price = 0.06;
         min = 100;
         max = 80000;
         step = 'instagram_auto_saves';

         //(id, step, link, amount, price) сохранили цену и запросил линку
         helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
         break;
         **/
        case '153':
            helper.template_general(chat.id, message_id, undefined, config.HTML_153_reach_impressions, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 153;
            label = "укажите ссылку на фото";
            task = "Охват и показы публикации - 0,12руб/шт";
            request_type = "false";
            example_text = "https://instagram.com/p/9ztjgAuS4t/";
            price = 0.12;
            min = 100;
            max = 12000;
            step = 'instagram_reach_impressions';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        /**
         case '95':
         bot.sendMessage(
         chat.id, config.HTML_95_comments, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
         service_id = 95;
         label = "укажите ссылку на фото или видео";
         task = "Коментарии (Свой текст) - 4руб/шт";
         request_type = "false";
         example_text = "https://instagram.com/p/9ztjgAuS4t/";
         price = 4;
         min = 5;
         max = 1000;
         step = 'instagram_comments';

         //(id, step, link, amount, price) сохранили цену и запросил линку
         helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
         break;
         **/
        case '156':

            helper.template_general(chat.id, message_id, undefined, config.HTML_156_auto_stories30, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 156;
            label = "укажите логин в instagram";
            task = "Авто просмотры stories (30 дней) - 5,80руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 5.8;
            min = 500;
            max = 10000;
            step = 'instagram_auto_stories30';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '100':

            helper.template_general(chat.id, message_id, undefined, config.HTML_100_like_comment, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 100;
            label = "укажите ссылку на фото / пост";
            task = "Лайки на комментарий - 0,54руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 0.54;
            min = 20;
            max = 10000;
            step = 'instagram_like_comment';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'TikTok':

            helper.template_general(chat.id, message_id, kb.tiktok_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "TikTok" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });
            step = 'Tiktok_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case '203':

            helper.template_general(chat.id, message_id, undefined, config.HTML_203_tiktok_autoLike_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 203;
            label = "укажите логин в tiktok";
            task = "Боты Авто лайки + просмотры 0.98руб/шт";
            request_type = "subscribe";
            example_text = "durov";
            price = 0.98;
            min = 10;
            max = 30000;
            step = 'tiktok_autoLike_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '204':

            helper.template_general(chat.id, message_id, undefined, config.HTML_204_tiktok_autoLike_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 204;
            label = "укажите логин в tiktok";
            task = "Люди Авто лайки + просмотры 1.38руб/шт";
            request_type = "subscribe";
            example_text = "durov";
            price = 1.38;
            min = 10;
            max = 50000;
            step = 'tiktok_autoLike_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '201':
            helper.template_general(chat.id, message_id, undefined, config.HTML_195_tiktok_followers_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 201;
            label = "укажите логин в tiktok";
            task = "Подписчики Люди 1.38руб/шт";
            request_type = "false";
            example_text = "durov";
            price = 1.38;
            min = 15;
            max = 10000;
            step = 'tiktok_followers_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '139':
            helper.template_general(chat.id, message_id, undefined, config.HTML_139_like_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 139;
            label = "укажите ссылку на видео";
            task = "Лайки Боты 0.98руб/шт";
            request_type = "false";
            example_text = "https://www.tiktok.com/@savko/video/6740628009834810629";
            price = 0.98;
            min = 10;
            max = 1000;
            step = 'tiktok_like_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '202':

            helper.template_general(chat.id, message_id, undefined, config.HTML_202_like_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 202;
            label = "укажите ссылку на видео";
            task = "Лайки Люди 1.38руб/шт";
            request_type = "false";
            example_text = "https://www.tiktok.com/@savko/video/6740628009834810629";
            price = 1.38;
            min = 10;
            max = 1000;
            step = 'tiktok_like_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '163':
            helper.template_general(chat.id, message_id, undefined, config.HTML_163_reposts, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 163;
            label = "укажите ссылку на видео";
            task = "Поделиться 1.70руб/шт";
            request_type = "false";
            example_text = "tiktok.com/@savko/video/6740628009834810629";
            price = 1.70;
            min = 20;
            max = 100000;
            step = 'tiktok_reposts';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '154':
            helper.template_general(chat.id, message_id, undefined, config.HTML_154_views_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 154;
            label = "укажите ссылку на видео";
            task = "Просмотры Боты 0.06руб/шт";
            request_type = "false";
            example_text = "tiktok.com/@savko/video/6740628009834810629";
            price = 0.06;
            min = 1000;
            max = 5000000;
            step = 'tiktok_views_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '196':
            helper.template_general(chat.id, message_id, undefined, config.HTML_196_views_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 196;
            label = "укажите ссылку на видео";
            task = "Просмотры Люди 0.10руб/шт";
            request_type = "false";
            example_text = "tiktok.com/@savko/video/6740628009834810629";
            price = 0.10;
            min = 1000;
            max = 500000;
            step = 'tiktok_views_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'Vkontakte':

            helper.template_general(chat.id, message_id, kb.vkontakte_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Vkontakte" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Vkontakte_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);
            break;
        case '39':
            helper.template_general(chat.id, message_id, undefined, config.HTML_39_vkontakte_autoLike_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 39;
            label = "укажите ссылку группу";
            task = "Боты Авто лайки 0.30руб/шт";
            request_type = "subscribe";
            example_text = "vk.com/plus";
            price = 0.30;
            min = 20;
            max = 100000;
            step = 'vkontakte_autoLike_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '40':
            helper.template_general(chat.id, message_id, undefined, config.HTML_40_vkontakte_autoLike_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 40;
            label = "укажите ссылку группу";
            task = "Люди Авто лайки 0.98руб/шт";
            request_type = "subscribe";
            example_text = "vk.com/plus";
            price = 0.98;
            min = 20;
            max = 100000;
            step = 'vkontakte_autoLike_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '33':
            helper.template_general(chat.id, message_id, undefined, config.HTML_33_vkontakte_followers_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 33;
            label = "укажите ссылку группу";
            task = "Боты Подписчики в группу 0.56руб/шт";
            request_type = "false";
            example_text = "vk.com/plus";
            price = 0.56;
            min = 100;
            max = 5000;
            step = 'vkontakte_followers_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '34':

            helper.template_general(chat.id, message_id, undefined, config.HTML_34_vkontakte_followers_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 34;
            label = "укажите ссылку группу";
            task = "Люди подписчики 1.70руб/шт";
            request_type = "false";
            example_text = "vk.com/plus";
            price = 1.70;
            min = 100;
            max = 5000;
            step = 'vkontakte_followers_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '35':

            helper.template_general(chat.id, message_id, undefined, config.HTML_35_vkontakte_like_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 35;
            label = "укажите ссылку на фото / пост";
            task = "Боты Лайки 0.30руб/шт";
            request_type = "false";
            example_text = "https://vk.com/plus?w = wall-76477496_38209";
            price = 0.30;
            min = 20;
            max = 50000;
            step = 'vkontakte_like_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '36':

            helper.template_general(chat.id, message_id, undefined, config.HTML_36_vkontakte_like_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 36;
            label = "укажите ссылку на фото / пост";
            task = "Люди Лайки 0.98руб/шт";
            request_type = "false";
            example_text = "Люди Лайки 0.98руб/шт";
            price = 0.98;
            min = 20;
            max = 50000;
            step = 'vkontakte_like_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '37':

            helper.template_general(chat.id, message_id, undefined, config.HTML_37_vkontakte_friends_bot, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 37;
            label = "Укажите ссылку на профиль";
            task = "Боты Друзья 0.58руб/шт";
            request_type = "false";
            example_text = "Укажите ссылку на профиль";
            price = 0.58;
            min = 100;
            max = 5000;
            step = 'vkontakte_friends_bot';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '38':

            helper.template_general(chat.id, message_id, undefined, config.HTML_38_vkontakte_like_real, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 38;
            label = "Укажите ссылку на профиль";
            task = "Люди Друзья 1.70руб/шт";
            request_type = "false";
            example_text = "Укажите ссылку на профиль";
            price = 1.70;
            min = 100;
            max = 5000;
            step = 'vkontakte_friends_real';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '161':

            helper.template_general(chat.id, message_id, undefined, config.HTML_161_vkontakte_video, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 161;
            label = "Укажите ссылку на видео";
            task = "Просмотры видео 0.30руб/шт";
            request_type = "false";
            example_text = "https://vk.com/video-76477496_38209";
            price = 0.30;
            min = 100;
            max = 2000;
            step = 'vkontakte_video';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '45':

            helper.template_general(chat.id, message_id, undefined, config.HTML_45_vkontakte_reposts, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 45;
            label = "укажите ссылку на фото / пост";
            task = "Поделиться 1.78руб/шт";
            request_type = "false";
            example_text = "https://vk.com/video-76477496_38209";
            price = 1.78;
            min = 5;
            max = 5000;
            step = 'vkontakte_reposts';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'Facebook':

            helper.template_general(chat.id, message_id, kb.facebook_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Facebook" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Facebook_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);
            break;
        case '42':
            helper.template_general(chat.id, message_id, undefined, config.HTML_42_facebook_likePage, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 42;
            label = "укажите ссылку на fanpage (страницу)";
            task = "Нравится fanpage 2руб/шт";
            request_type = "false";
            example_text = "https://www.facebook.com/audi/";
            price = 2;
            min = 10;
            max = 5000;
            step = 'facebook_likePage';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '44':
            helper.template_general(chat.id, message_id, undefined, config.HTML_44_facebook_joinGro, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 44;
            label = "укажите ссылку на группу";
            task = "Вступить в группу 2руб/шт";
            request_type = "false";
            example_text = "https://www.facebook.com/audi/";
            price = 2;
            min = 10;
            max = 10000;
            step = 'facebook_joinGro';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '43':

            helper.template_general(chat.id, message_id, undefined, config.HTML_43_facebook_friends, function (text, opts) {
                bot.editMessageText(text, opts);

            });



            service_id = 43;
            label = "укажите ссылку на личный профиль";
            task = "Друзья 2руб/шт";
            request_type = "false";
            example_text = "https://www.facebook.com/audi/";
            price = 2;
            min = 10;
            max = 10000;
            step = 'facebook_friends';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '41':

            helper.template_general(chat.id, message_id, undefined, config.HTML_41_facebook_likePhPo, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 41;
            label = "укажите ссылку на фото/пост";
            task = "Нравится фото/пост 2руб/шт";
            request_type = "false";
            example_text = "https://www.facebook.com/aleksandrrevvaofficial/videos/1346619428786452/";
            price = 2;
            min = 10;
            max = 10000;
            step = 'facebook_likePhPo';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'Odnoklassniki':

            helper.template_general(chat.id, message_id, kb.odnoklassniki_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Odnoklassniki" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Odnoklassniki_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case '145':

            helper.template_general(chat.id, message_id, undefined, config.HTML_145_odnoklassniki_followers, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 145;
            label = "укажите ссылку на одноклассники";
            task = "Подписчики 2,8руб/шт";
            request_type = "false";
            example_text = "http://odnoklassniki.ru/group/52311784423583";
            price = 2.8;
            min = 100;
            max = 10000;
            step = 'odnoklassniki_followers';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '31':

            helper.template_general(chat.id, message_id, undefined, config.HTML_31_odnoklassniki_friends, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 31;
            label = "укажите ссылку на одноклассники";
            task = "Друзья 2.8руб/шт";
            request_type = "false";
            example_text = "https://ok.ru/fkirkorov.official";
            price = 2.8;
            min = 50;
            max = 2000;
            step = 'odnoklassniki_friends';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '144':

            helper.template_general(chat.id, message_id, undefined, config.HTML_144_odnoklassniki_like, function (text, opts) {
                bot.editMessageText(text, opts);

            });




            service_id = 144;
            label = "укажите ссылку на одноклассники";
            task = "Лайки 2.8руб/шт";
            request_type = "false";
            example_text = "https://ok.ru/otserdt/album/54470853722124/834908041228";
            price = 2.8;
            min = 50;
            max = 10000;
            step = 'odnoklassniki_like';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '146':

            helper.template_general(chat.id, message_id, undefined, config.HTML_146_odnoklassniki_reposts, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 146;
            label = "укажите ссылку на одноклассники";
            task = "Поделиться 2.8руб/шт";
            request_type = "false";
            example_text = "https://ok.ru/otserdt/album/54470853722124/834908041228";
            price = 2.8;
            min = 50;
            max = 10000;
            step = 'odnoklassniki_reposts';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'Twitter':

            helper.template_general(chat.id, message_id, kb.twitter_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "Twitter" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'Twitter_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case '3':

            helper.template_general(chat.id, message_id, undefined, config.HTML_3_twitter_followers, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 3;
            label = "укажите ссылку на twitter";
            task = "Подписчики 2.50руб/шт";
            request_type = "false";
            example_text = "https://twitter.com/durov/";
            price = 2.5;
            min = 10;
            max = 10000;
            step = 'twitter_followers';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '4':

            helper.template_general(chat.id, message_id, undefined, config.HTML_4_twitter_retweets, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 4;
            label = "укажите ссылку на твит";
            task = "Ретвиты 2.50руб/шт";
            request_type = "false";
            example_text = "https://twitter.com/durov/status/733008251466317828";
            price = 2.50;
            min = 50;
            max = 10000;
            step = 'twitter_retweets';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'YouTube':

            helper.template_general(chat.id, message_id, kb.youtube_services, '<b>☁️Выберите нужный Вам раздел ниже:</b> "YouTube" ', function (text, opts) {
                bot.editMessageText(text, opts);

            });

            step = 'YouTube_platform';
            previous_step = 'Заказ';
            helper.switchState(chat.id, step, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, previous_step);

            break;
        case '16':

            helper.template_general(chat.id, message_id, undefined, config.HTML_16_youtube_followers, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 16;
            label = "укажите ссылку на канал";
            task = "Подписчики 8руб/шт";
            request_type = "false";
            example_text = "https://www.youtube.com/user/kvn";
            price = 8;
            min = 10;
            max = 300000;
            step = 'youtube_followers';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '14':

            helper.template_general(chat.id, message_id, undefined, config.HTML_14_youtube_likes, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 14;
            label = "укажите ссылку на видео";
            task = "Лайки 8руб/шт";
            request_type = "false";
            example_text = "https://www.youtube.com/watch?v=wsYDuUdj2Ck";
            price = 8;
            min = 10;
            max = 1000;
            step = 'youtube_likes';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '15':

            helper.template_general(chat.id, message_id, undefined, config.HTML_15_youtube_dislikes, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 15;
            label = "укажите ссылку на видео";
            task = "Дизлайки 8руб/шт";
            request_type = "false";
            example_text = "https://www.youtube.com/watch?v=wsYDuUdj2Ck";
            price = 8;
            min = 10;
            max = 1000;
            step = 'youtube_dislikes';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case '25':

            helper.template_general(chat.id, message_id, undefined, config.HTML_25_youtube_views, function (text, opts) {
                bot.editMessageText(text, opts);

            });


            service_id = 25;
            label = "укажите ссылку на видео";
            task = "Просмотры 0.78руб/шт";
            request_type = "false";
            example_text = "https://www.youtube.com/watch?v=wsYDuUdj2Ck";
            price = 0.78;
            min = 1000;
            max = 100000;
            step = 'youtube_views';

            //(id, step, link, amount, price) сохранили цену и запросил линку
            helper.switchState(chat.id, step, undefined, undefined, price, undefined, label, example_text, min, max, task, request_type, service_id);
            break;
        case 'add_funds':

            helper.template_general(chat.id, message_id, undefined, config.HTML_add_funds, function (text, opts) {
                bot.editMessageText(text, opts);

            });

            //(id, step, link, amount, price, sum, text, example_text, min, max, task, request_type, service_id)
            helper.switchState(chat.id, 'add_funds');
            break;


    }


});

bot.on('inline_query', msg => {
    const {chat, message_id, text} = msg.message;
    let result = {
        name: 1
    };

    bot.answerInlineQuery(chat.id, result, {});


});

bot.onText(/start/i, (msg, [source, match]) => {


    if (msg.from.id.toString() === process.env.Admin_ID) {
        bot.sendMessage(msg.chat.id, "Hello Admin 🙌", {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: {
                keyboard: keyboard.admin,
                resize_keyboard: true
            }

        }).then(setTimeout(() => {
            bot.sendMessage(helper.getChatId(msg), '☁️Выберите нужный Вам раздел ниже:', {
                reply_markup: {
                    inline_keyboard: kb.homepage
                }
            })
        }, 700))
            .catch((error) => {
                console.error(error)
            });
    } else {
        bot.sendMessage(helper.getChatId(msg), config.HTML_main, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: {
                keyboard: keyboard.homepage,
                resize_keyboard: true
            }
        })
            .then(setTimeout(() => {
                bot.sendMessage(helper.getChatId(msg), '☁️Выберите нужный Вам раздел ниже:', {
                    reply_markup: {
                        inline_keyboard: kb.homepage
                    }
                })
            }, 700))
            .catch((error) => {
                console.error(error)
            });

    }


});

bot.onText(/admin/i, function (msg) {

    //подумать над реализацией

    if (msg.from.id.toString() === process.env.Admin_ID) {

        bot.sendMessage(msg.chat.id, "Hello Admin 🙌", {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: {
                keyboard: keyboard.admin,
                resize_keyboard: true
            }

        }).then(setTimeout(() => {
            bot.sendMessage(helper.getChatId(msg), '☁️Выберите нужный Вам раздел ниже:', {
                reply_markup: {
                    inline_keyboard: kb.homepage
                }
            })
        }, 700))
            .catch((error) => {
                console.error(error)
            });

    }
    else {
        bot.sendMessage(msg.chat.id, "☁️Выберите нужный Вам раздел ниже:", {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: kb.homepage
            }
        });
    }

});



module.exports = app;


/**
 пример подготовки массива - подойдет для микроСтаты

 if (action === 'my_link') {

        opts['reply_markup'] =  JSON.stringify({
            inline_keyboard:
                [
                    [
                        {
                            text: 'Назад',
                            callback_data: 'back'
                        }
                    ],
                ]

        });

        userScheme.find({id: msg.from.id}, function (err, rows) {
            let texti = [];

            async function processArray() {
                for (let i = 0; i < rows[0].user_url_arr_bit.length; i++) {
                    console.log(rows[0].user_url_arr_bit);

                    await texti.push(`
☁️ link_long: ${rows[0].user_url_arr_bit[i].link_long}
☁️ link_short: ${rows[0].user_url_arr_bit[i].link_short}
☁️ last_click: ${rows[0].user_url_arr_bit[i].total_clicks}
☁️ Количество: ${rows[0].user_url_arr_bit[i].amount}

                `)
                }
                bot.editMessageText(`${texti}`, opts);

            }
            processArray();

        })


    }


 **/