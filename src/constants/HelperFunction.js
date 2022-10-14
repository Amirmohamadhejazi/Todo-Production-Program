
export const getCookieFunc = (cName) => {
    let name = `${cName}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let cArr = decodedCookie.split(";");
    for (let i = 0; i < cArr.length; i++) {
        let c = cArr[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const funcLogCookies = (name) => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name]
};

export const MakeToken = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

export const LoginWebhook = ({payload}) => {
    console.log(payload)
    fetch('https://geolocation-db.com/json/', {
        method: 'Get',
    })
        .then((response) => response.json())
        .then((data) => {
            SendWebhook(data.IPv4, data.country_name ,payload)
        })
        .catch((error) => {
            return  error
        });
};

function SendWebhook(ip ,country, input) {
    const d = new Date();
    let dateTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    ip && fetch('https://discord.com/api/webhooks/1022966932409946272/TSNIfWAUH-jdUHVWJ8TxpaZtJUiInpiXhweOARD6i67PSsCdLFxxCLZAc6kviWNY7RIo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": "𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐖𝐞𝐛𝐡𝐨𝐨𝐤",
            "embeds": [
                {
                    "title": "User Created",
                    "color": 145369,
                    "fields": [
                        {
                            "name": "Username",
                            "value": `${input.Username}`,
                            "inline": true
                        },
                        {
                            "name": "Email",
                            "value": `${input.Email}`,
                            "inline": true
                        },
                        {
                            "name": "Phone",
                            "value": `${input.Phone}`,
                            "inline": true
                        },
                        {
                            "name": "Logged IP",
                            "value": `${ip}`,
                            "inline": true
                        },
                        {
                            "name": "Country Name",
                            "value": `${country}`,
                            "inline": true
                        }
                    ],
                    "footer": {"text": `Time: ${dateTime}`}
                }
            ]
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}