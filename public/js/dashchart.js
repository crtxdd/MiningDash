fetch("db.json")
.then(response => response.json())
.then(data => {

    // 0.001191 eth at start of 21st

    let c, a, m, bal8;
    bal8 = data.walletbalance / 8;
    c = bal8 *3;
    a = bal8 *3;
    m = bal8 *2;

    //  Fill Data into html fields
    document.getElementById('walbal').innerText = (data.walletbalance/1000000000000000000).toFixed(7) + " Ξ";
    document.getElementById('poolbal').innerText = (data.poolbalance/1000000000000000000).toFixed(7) + " Ξ";
    document.getElementById('price').innerText = "£" + data.price;
    document.getElementById('hash').innerText = (data.hashrate/1000000).toFixed(2) + " MH/s";
    document.getElementById('ticker').innerHTML = "£" + ((data.walletbalance/1000000000000000000) * data.price).toFixed(2);

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Callum', 'Andras', 'Mark'],
            datasets: [{
                label: 'Split of Balance',
                data: [((c/1000000000000000000)).toFixed(7), ((a/1000000000000000000)).toFixed(7), ((m/1000000000000000000)).toFixed(7)],
                backgroundColor: [
                    'rgba(37, 204, 247,0.8)',
                    'rgba(27, 156, 252,0.8)',
                    'rgba(59, 59, 152,0.8)'
                ],
                borderColor: [
                    'rgba(37, 204, 247,1.0)',
                    'rgba(27, 156, 252,1.0)',
                    'rgba(59, 59, 152,1.0)'
                ],
                borderWidth: 1
            }]
        },
    });
    var ctx = document.getElementById('historyChart');
    let points = [];
    for (let index = 0; index < 50; index++) {
        points.push(index);
    }
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: points,
            datasets: [{
                label: 'Hashrate',
                data: data.hash_history,
                backgroundColor: [
                    'rgba(255, 165, 0, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 165, 0, 1)'
                ],
                borderWidth: 2
            },
        
            {
                label: 'Luck',
                data: data.luck_history,
                backgroundColor: [
                    'rgba(255, 165, 0, 0)'
                ],
                borderColor: [
                    'lightblue'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: false,
                        labelString: '5 Mins'
                    }
                }],
            }
        }
    });

    const rTable = document.getElementById('rewardstable');
    const pTable = document.getElementById('paymentstable');
    const wTable = document.getElementById('workertable');

    data.rewards.forEach(item => {
        let row = rTable.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = item.date;
        let amount = row.insertCell(1);
        amount.innerHTML = (item.amount/1000000000000000000).toFixed(7) + " Ξ";
        let value = row.insertCell(2);
        value.innerHTML = (item.amount/1000000000000000000 * item.price).toFixed(2);
        let price = row.insertCell(3);
        price.innerHTML = item.price;
        price.textContent = (+price.textContent).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });
        value.textContent = (+value.textContent).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });
    });
    data.payments.forEach(item => {
        let row = pTable.insertRow();
        let date = row.insertCell(0);
        date.innerHTML = "<a class=\"datelink\" href=\"https://etherscan.io/tx/" + item.txid + "\">" + item.date + "</a>";
        let amount = row.insertCell(1);
        amount.innerHTML = (item.amount/1000000000000000000).toFixed(7) + " Ξ";
        let value = row.insertCell(2);
        value.innerHTML = (item.amount/1000000000000000000 * item.price).toFixed(2);
        let price = row.insertCell(3);
        price.innerHTML = item.price;
        price.textContent = (+price.textContent).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });
        value.textContent = (+value.textContent).toLocaleString('en-US', { style: 'currency', currency: 'GBP' });
    });

});

