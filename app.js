const APP_CONFIG = {
symbol: "BTCUSDT",
interval: "1h",
chartBackground: "#020617",
textColor: "#CBD5E1",
upColor: "#22C55E",
downColor: "#EF4444"
};

class ChartManager {

constructor(containerId) {

this.container = document.getElementById(containerId);

this.chart = LightweightCharts.createChart(this.container, {

layout: {
background: {
color: APP_CONFIG.chartBackground
},
textColor: APP_CONFIG.textColor
},

grid: {

vertLines: {
color: "#1E293B"
},

horzLines: {
color: "#1E293B"
}

},

crosshair: {
mode: LightweightCharts.CrosshairMode.Normal
},

rightPriceScale: {
borderColor: "#334155"
},

timeScale: {
borderColor: "#334155",
timeVisible: true
}

});

this.candleSeries = this.chart.addCandlestickSeries({

upColor: APP_CONFIG.upColor,
downColor: APP_CONFIG.downColor,

borderVisible: false,

wickUpColor: APP_CONFIG.upColor,
wickDownColor: APP_CONFIG.downColor

});

window.addEventListener("resize", () => {

this.chart.applyOptions({

width: this.container.clientWidth,
height: this.container.clientHeight

});

});

this.chart.applyOptions({

width: this.container.clientWidth,
height: this.container.clientHeight

});

}

setData(data) {

this.candleSeries.setData(data);

}

update(candle) {

this.candleSeries.update(candle);

}

fit() {

this.chart.timeScale().fitContent();

}

}

class DataFeed {
constructor(symbol, callback) {
this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${APP_CONFIG.interval}`);
this.socket.onmessage = (event) => {
const message = JSON.parse(event.data);
const k = message.k;
callback({ time: k.t / 1000, open: parseFloat(k.o), high: parseFloat(k.h), low: parseFloat(k.l), close: parseFloat(k.c) });
document.getElementById('livePrice').innerText = k.c;
};
}
}

const chart = new ChartManager('chart');
const feed = new DataFeed(APP_CONFIG.symbol, (data) => chart.update(data));

