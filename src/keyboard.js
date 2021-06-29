const kb = require('./keyboard_buttons');

module.exports = {
    homepage: [
        [kb.general.home_menu],
    ],
    profile: [
        [kb.profile],
    ],
    help: [
        [kb.help],
    ],
    select_social: [
        [kb.select_social],
    ],
    instagram_services: [
        [kb.instagram_services]
    ],
    tiktok_services: [
        [kb.tiktok_services]
    ],
    vkontakte_services:[
        [kb.vkontakte_services]
    ],
    facebook_services:[
        [kb.facebook_services]
    ],
    odnoklassniki_services:[
        [kb.odnoklassniki_services]
    ],
    twitter_services:[
        [kb.twitter_services]
    ],
    youtube_services:[
        [kb.youtube_services]
    ],
    back: [
        [kb.back]
    ],
    pay: [kb.pay],
    add_funds: [kb.add_funds],
    admin: [
        [kb.general.home_menu],
        [kb.admin.Announcement, kb.admin.Announcement_preview],
        [kb.admin.All_Status,kb.admin.Live_Status,kb.admin.Live_Stop],
        [kb.admin.BalanceS, kb.admin.BalanceL],
        [kb.admin.TaskS, kb.admin.TaskL],
        [kb.admin.AllUser],
        [kb.admin.ref_reg],
        [kb.admin.Admin],

    ],
};