const userScheme = require('../models/user.model');
const sha1 = require('sha1');
const TelegramBot = require('node-telegram-bot-api');
const microstats = require('microstats');
require('dotenv').config({path: __dirname + '/.env'});
const keyboard = require('../src/keyboard');
const kb = require('../src/keyboard_buttons');


module.exports = {

    getChatId(msg) {
        return msg.chat.id
    },

    switchState(id, step, link, amount, price, sum, text, example_text, min, max, task, request_type, service_id, add_funds, post_old, post_new, comments, login, payload, previous_step) {

        //console.log('зашли в switchState: ', id, step, link, amount, price, sum, text, example_text, min, max, task, request_type, service_id, add_funds, post_old, post_new);

        if (price) {
            userScheme.updateMany({id: id}, {
                $set: {
                    step: step,
                    price: price,
                    text: text,
                    example_text: example_text,
                    min: min,
                    max: max,
                    task: task,
                    request_type: request_type,
                    service_id: service_id
                }
            }, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK price', step);
                }
            });
        }

        if (amount && sum) {
            userScheme.updateMany({id: id}, {
                $set: {
                    step: step,
                    amount: amount,
                    sum: sum
                }
            }, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK amount && sum', sum);
                }
            });
        }

        if (link) {
            userScheme.updateMany({id: id}, {$set: {step: step, link: link}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK link', step);
                }
            });
        }

        if (post_old) {
            userScheme.updateMany({id: id}, {$set: {step: step, post_old: post_old}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK  post_old', step);
                }
            });
        }

        if (post_new) {
            userScheme.updateMany({id: id}, {$set: {step: step, post_new: post_new}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK post_new', step);
                }
            });
        }

        if (add_funds) {
            userScheme.updateMany({id: id}, {
                $set: {
                    step: step,
                    add_funds: add_funds,
                    invoice_payload: payload
                }
            }, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK add_funds', step);
                }
            });
        }

        if (step && !link && !amount && !price && !sum && !text && !example_text && !min && !max && !task && !request_type && !service_id && !add_funds && !post_old && !post_new && !login && !payload) {
            userScheme.updateMany({id: id}, {$set: {step: step, previous_step:previous_step}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('шаг: ', step, '/ предыдущий:', previous_step);
                }
            });
        }

        if (comments) {
            let mySplits = comments.split('()');

            console.log('COMMENTS mySplits _ ', mySplits);
        }

        if (login) {
            userScheme.updateMany({id: id}, {$set: {step: step, login: login}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('OK login', step);
                }
            });
        }



    },

    async userCheck(id, callback, ref) {

        await userScheme.find({id: id}, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                // не нашли -> создали



                if (rows.length === 0) {

                    let newRef = ref.split(' ')[1];


                    let user = new userScheme({
                        id: id,
                        balance: 0,
                        add_funds: 0,
                        invoice_payload: null,
                        login: null,
                        comments: [],
                        link: null,
                        post_old: null,
                        post_new: null,
                        amount: null,
                        service_id: null,
                        task: null,
                        request_type: null,
                        text: null,
                        example_text: null,
                        price: null,
                        min: null,
                        max: null,
                        sum: null,
                        userOrder: [],
                        userOrder_t: [],
                        addFunds_t: [],
                        step: 'New_user',
                        previous_step: 'New_user',
                        ref: newRef || '',
                    });
                    // сохранили
                    user.save(function (err) {

                        if (err) return console.log(err);

                        console.log("User save #", user.id);
                    });

                    //отправили инфу
                    callback([user]);
                } else {

                    console.log('User in DB', rows[0].id);
                    callback(rows);


                }

            }


        });
    },

    balance_man(id, balance, callback) {

        userScheme.updateMany({id: id}, {$set: {balance: balance}}, {upsert: false}, function (err) {
            if (err) {
                console.log(err);
            } else {
                callback(`balance Новый баланс -> ${balance} `);
            }
        });
    },

    async order(id, order) {

        await userScheme.updateMany({id: id }, { $push: { userOrder_t: order }});




    },

    async deleteOrder(id, order) {

        console.log("order", order);
        //await userScheme.updateOne({id: id}, { $pull: { 'userOrder': '3114833' } })

        userScheme.updateMany({ id: id }, { "$pull": { "userOrder": { id: `${order}` } }}, { safe: true, multi:true }, function(err, obj) {
            //do something smart
        });
        },

    async addFundsHist(id, order) {

        await userScheme.updateMany({id: id }, { $push: { addFunds_t: order }});




    },

    add_funds(id, balance, callback) {

        userScheme.updateMany({id: id}, {$set: {balance: balance, add_funds: '0', step: 'money'}}, {upsert: false}, function (err) {
            if (err) {
                console.log(err);
            } else {
                callback(`addFunds Новый баланс -> ${balance} `);
            }
        });
    },

    all_user(cb) {
        userScheme.find({}, function (err, rows) {
            cb(rows.length);
        })
    },

    resetUserInfo(id, callback) {

        userScheme.updateMany({id: id}, {$set: {
                add_funds: 0,
                login: null,
                comments: [],
                link: null,
                post_old: null,
                post_new: null,
                amount: null,
                service_id: null,
                task: null,
                request_type: null,
                text: null,
                example_text: null,
                price: null,
                min: null,
                max: null,
                sum: null,
                step: 'v1',
                previous_step:'Главное меню'

            }}, {upsert: false}, function (err) {
            if (err) {
                console.log(err);
            } else {
                callback(`Данные сброшены `);
            }
        });
    },

    announcement(cb) {
        userScheme.find({}, function (err, rows) {
            cb(rows);
        })
    },

    refArr (ref, cb) {
        userScheme.find({ref: ref}, function (err, rows) {
            cb(rows);
        })
    },

    checkUrl (url, type, type2, type3, type4, cb) {

        if (type && !type2 && !type3) {
            console.log('пример 1');
            if(url.indexOf(type) != -1) {
                cb('ok');
            } else {
                cb('check_link');
            }
        }

        if (type && type2 && !type3) {
            console.log('пример 2');
            if(url.indexOf(type) != -1 || url.indexOf(type2) != -1 ) {
                cb('ok');
            } else {
                cb('check_link');
            }
        }

        if (type && type2 && type3 && !type4) {
            console.log('пример 3');
            if(url.indexOf(type) != -1 || url.indexOf(type2) != -1 || url.indexOf(type3) != -1 ) {
                cb('ok');
            } else {
                cb('check_link');
            }
        }

        if (type && type2 && type3 && type4) {
            console.log('пример 4');
            if(url.indexOf(type) != -1 || url.indexOf(type2) != -1 || url.indexOf(type3) != -1 || url.indexOf(type4) != -1 ) {
                cb('ok');
            } else {
                cb('check_link');
            }
        }
    },


    template_general(chat_id, message_id, inline_keyboard, textS, callback) {
        let text = textS;

        const opts = {
            chat_id: chat_id,
            message_id: message_id,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: JSON.stringify({
                inline_keyboard: inline_keyboard

            })

        };

        callback(text,opts);

    },


    /**
     switcher(id, step, obj) {

        console.log('зашли в switcher:');
        if (step && !obj) {
            console.log('есть');
            userScheme.updateMany({id: id}, {$set: {step: step}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' step: Сосотояние обновлено на -> ', step);
                }
            });
        }
        if (obj.price) {
            console.log('сюда');
            userScheme.updateMany({id: id}, {$set: {step: step, userOrder: {price: obj.price, text: obj.text, example_text: obj.example_text, min: obj.min, max: obj.max, task: obj.task, request_type:obj.request_type, service_id:obj.service_id} }}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' price: Сосотояние обновлено на -> ', step);
                }
            });
        }

        if (obj.amount && obj.sum) {
            userScheme.updateMany({id: id}, {
                $set: {
                    step: step,
                    amount: amount,
                    sum: sum
                }
            }, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' amount && sum: SUM  обновлено на -> ', sum);
                }
            });
        }

        if (obj.link) {
            userScheme.updateMany({id: id}, {$set: {step: step, link: link}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' link: Сосотояние обновлено на -> ', step);
                }
            });
        }

        if (obj.post_old) {
            userScheme.updateMany({id: id}, {$set: {step: step, post_old: post_old}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' post_old: Сосотояние обновлено на -> ', step);
                }
            });
        }

        if (obj.post_new) {
            userScheme.updateMany({id: id}, {$set: {step: step, post_new: post_new}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' post_new: Сосотояние обновлено на -> ', step);
                }
            });
        }

        if (obj.add_funds) {
            userScheme.updateMany({id: id}, {$set: {step: step, add_funds: add_funds}}, {upsert: false}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(' add_funds: Сосотояние обновлено на -> ', step);
                }
            });
        }




    },
     **/
};







