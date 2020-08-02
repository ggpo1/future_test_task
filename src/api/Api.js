export default class Api {
    static getSmallData() {
        return new Promise((resolve => {
            fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                // console.log(body);
            }).catch(() => {
                
            })
        }));
    }

    static getLargeData() {
        return new Promise((resolve => {
            fetch(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`, {
                method: 'GET',
            }).then((response) => response.json()).then((body) => {
                resolve(body);
                // console.log(body);
            }).catch(() => {
                
            })
        }));
    }
}
