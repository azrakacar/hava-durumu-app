const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Japonya'nın 47 Valiliği + Popüler Dünya Şehirleri & Doğa Bilgileri
const cityCoordinates = {
    // --- JAPONYA 47 VALİLİK ---
    Sapporo: { lat: 43.0618, lon: 141.3545, region: "Hokkaido", treeInfo: "Hokkaido'nun ikonik Lareks ve Kar Çamları, yoğun kar yağışına ve dondurucu soğuklara dayanıklı yapısıyla öne çıkar." },
    Aomori: { lat: 40.8244, lon: 140.7400, region: "Tohoku", treeInfo: "Dünyaca ünlü elma bahçeleri ve Hakkoda dağlarındaki buzlaşmış anıt ağaçlar sert kışlara karşı dirençlidir." },
    Morioka: { lat: 39.7036, lon: 141.1527, region: "Tohoku", treeInfo: "Kuzeyin sert rüzgarlarına karşı koyan devasa kaya çatlağından çıkan Ishikari Sakura ağaçları simgesidir." },
    Sendai: { lat: 38.2682, lon: 140.8694, region: "Tohoku", treeInfo: "Keyaki (Japon Zelkova) ağaçlarıyla ünlü cadde ağaçları, Kuzey'in sert rüzgarlarına karşı dirençlidir." },
    Akita: { lat: 39.7186, lon: 140.1024, region: "Tohoku", treeInfo: "Zengin sedir ormanları ve nemli dağ eteklerindeki yerel bitki örtüsüyle bilinir." },
    Yamagata: { lat: 38.2404, lon: 140.3636, region: "Tohoku", treeInfo: "Kiraz ve meyve bahçeleriyle çevrili dağlık vadilerde kar örtüsü ağaçları korur." },
    Fukushima: { lat: 37.7503, lon: 140.4676, region: "Tohoku", treeInfo: "Şeftali ve meyve ağaçları, havza ikliminin sıcak yazları ve soğuk kışlarından etkilenir." },

    Tokyo: { lat: 35.6762, lon: 139.6503, region: "Kanto", treeInfo: "Tokyo'nun sembolü olan Ginkgo (mabet ağacı) ve Sakura, sonbaharda sarıya ilkbaharda pembeye bürünür. Park ağaçları mevsime göre budanır." },
    Yokohama: { lat: 35.4437, lon: 139.6380, region: "Kanto", treeInfo: "Kıyı kesimindeki tuzlu rüzgarlar, sahil şeridindeki bitki örtüsü ve çam ağaçlarının gelişimini etkiler." },
    Utsunomiya: { lat: 36.5551, lon: 139.8828, region: "Kanto", treeInfo: "Nikko yakınlarındaki devasa ve tarihi sedir ağaçları yolları tünel gibi kaplar." },
    Maebashi: { lat: 36.3911, lon: 139.0605, region: "Kanto", treeInfo: "Kuru rüzgarlarıyla ünlü bölgede kestane ve dut ağaçları yaygındır." },
    Saitama: { lat: 35.8617, lon: 139.6455, region: "Kanto", treeInfo: "Geniş ova ikliminde yetişen zelkova ve akçaağaçlar kentsel yeşil alanları oluşturur." },
    Chiba: { lat: 35.6074, lon: 140.1065, region: "Kanto", treeInfo: "Okyanus etkisindeki yarımadada çam ormanları ve ılıman iklim bitkileri hakimdir." },
    Mito: { lat: 36.3418, lon: 140.4468, region: "Kanto", treeInfo: "Kairakuen bahçesindeki binlerce antik erik ağacı erken bahar donlarına karşı hassastır." },

    Niigata: { lat: 37.9161, lon: 139.0364, region: "Chubu", treeInfo: "Kar yağışının en yoğun olduğu bölgelerdendir; pirinç tarlaları ve kar dayanımlı meyve ağaçları yaygındır." },
    Toyama: { lat: 36.6953, lon: 137.2113, region: "Chubu", treeInfo: "Alp Dağları'ndan gelen erime suları ve nemli hava sedir ağaçlarını besler." },
    Kanazawa: { lat: 36.5613, lon: 136.6562, region: "Chubu", treeInfo: "Kenroku-en bahçesindeki tarihi çamlar, kışın dallarının kırılmaması için 'Yukitsuri' ipleriyle korunur." },
    Fukui: { lat: 36.0652, lon: 136.2219, region: "Chubu", treeInfo: "Japon Denizi'nin sert rüzgarlarına karşı kıyı şeridinde sıkı çam kuşakları bulunur." },
    Kofu: { lat: 35.6639, lon: 138.5684, region: "Chubu", treeInfo: "Üzüm bağları ve şeftali bahçeleriyle ünlü havza iklimine sahiptir." },
    Nagano: { lat: 36.6513, lon: 138.1812, region: "Chubu", treeInfo: "Dağlık coğrafyadaki çam ve ladin ormanları kış turizmi ve doğa dengesi için hayati önem taşır." },
    Gifu: { lat: 35.4233, lon: 136.7607, region: "Chubu", treeInfo: "Sık ormanlarla kaplı dağlık vadilerde sel koruma ormanları yer alır." },
    Shizuoka: { lat: 34.9769, lon: 138.3831, region: "Chubu", treeInfo: "Fuji Dağı eteklerindeki ünlü yeşil çay tarlaları ve sedir ormanları volkanik toprak yapısından beslenir." },
    Nagoya: { lat: 35.1815, lon: 136.9066, region: "Chubu", treeInfo: "Chubu bölgesinin merkezindeki kestane ve çam ağaçları, karasal ve denizel iklim geçişlerinden etkilenir." },

    Kyoto: { lat: 35.0116, lon: 135.7681, region: "Kansai", treeInfo: "Arashiyama'nın dünyaca ünlü devasa Bambu Ormanları ve Japon akçaağaçları (Momiji) bölgenin nem dengesine bağlıdır." },
    Osaka: { lat: 34.6937, lon: 135.5022, region: "Kansai", treeInfo: "Osaka kalesi çevresindeki antik erik ve kiraz ağaçları, ani don olaylarına ve yaz fırtınalarına karşı hassastır." },
    Kobe: { lat: 34.6901, lon: 135.1955, region: "Kansai", treeInfo: "Rokko Dağı eteklerindeki meşe ve çam örtüsü, ani yağışlarda toprak kaymalarına karşı doğal kalkan oluşturur." },
    Nara: { lat: 34.6851, lon: 135.8048, region: "Kansai", treeInfo: "Nara parkındaki devasa yaşlı Japon sedirleri ve kutsal meşeler bölgenin ekolojik simgesidir." },
    Otsu: { lat: 35.0045, lon: 135.8686, region: "Kansai", treeInfo: "Biwa Gölü çevresindeki sulak alan ekosistemleri ve sahil bitki örtüsü koruma altındadır." },
    Wakayama: { lat: 34.2260, lon: 135.1675, region: "Kansai", treeInfo: "Koyasan'ın dağlık ve kutsal ormanlarında bin yıllık dev sedir ağaçları bulunur." },
    Tsu: { lat: 34.7303, lon: 136.5086, region: "Kansai", treeInfo: "Ise körfezi kıyısındaki çamlıklar rüzgar erozyonunu engeller." },

    Tottori: { lat: 35.5036, lon: 134.2383, region: "Chugoku", treeInfo: "Kum tepeleri sınırındaki özel çöl bitkileri ve rüzgar kıran çam ağaçları dikkat çeker." },
    Matsue: { lat: 35.4723, lon: 133.0505, region: "Chugoku", treeInfo: "Shinji gölü çevresindeki nemli ova bitki örtüsü ve çamlar yaygındır." },
    Okayama: { lat: 34.6618, lon: 133.9350, region: "Chugoku", treeInfo: "Güneşli iklimiyle bilinen bölgede şeftali ve üzüm ağaçları yüksek verim verir." },
    Hiroshima: { lat: 34.3853, lon: 132.4553, region: "Chugoku", treeInfo: "Miyajima adasındaki anıt akçaağaçlar, bölgenin nemli okyanusal iklimi sayesinde yüzyıllardır korunmaktadır." },
    Yamaguchi: { lat: 34.1859, lon: 131.4714, region: "Chugoku", treeInfo: "Akiyoshidai karstik platoları çevresindeki özel otlaklar ve bodur ağaçlar yaygındır." },

    Tokushima: { lat: 34.0658, lon: 134.5593, region: "Shikoku", treeInfo: "Nehir vadilerindeki sedir ve selvi ağaçları bölgenin ormancılık ekonomisini destekler." },
    Takamatsu: { lat: 34.3401, lon: 134.0433, region: "Shikoku", treeInfo: "Ritsurin bahçesindeki özenle budanan antik çam ağaçları peyzajın kalbidir." },
    Matsuyama: { lat: 33.8416, lon: 132.7654, region: "Shikoku", treeInfo: "Ilıman Akdeniz benzeri iklimde narenciye bahçeleri ve palmiye türleri yetişir." },
    Kochi: { lat: 33.5597, lon: 133.5311, region: "Shikoku", treeInfo: "Pasifik okyanusundan gelen tayfunlara açık bölgede dayanıklı kıyı ormanları bulunur." },

    Fukuoka: { lat: 33.5902, lon: 130.4017, region: "Kyushu", treeInfo: "Güney ikliminin sıcak yapısı, tropikal bitki örtüsü ve narenciye ağaçları için elverişli ortam sunar." },
    Saga: { lat: 33.2494, lon: 130.2988, region: "Kyushu", treeInfo: "Geniş delta ovalarındaki pirinç tarlaları ve su kenarı kavak ağaçları yaygındır." },
    Nagasaki: { lat: 32.7503, lon: 129.8779, region: "Kyushu", treeInfo: "Kıyı tepelerindeki portakal bahçeleri ve kamelya ağaçları bol güneş ve nemli hava sever." },
    Kumamoto: { lat: 32.7898, lon: 130.7417, region: "Kyushu", treeInfo: "Aso yanardağı eteklerindeki volkanik kül toprakları özel çayır ve otlak ekosistemi yaratır." },
    Oita: { lat: 33.2382, lon: 131.6126, region: "Kyushu", treeInfo: "Termal suların ve dağlık vadilerin nemiyle beslenen geniş yapraklı ormanlar vardır." },
    Miyazaki: { lat: 31.9111, lon: 131.4239, region: "Kyushu", treeInfo: "Subtropikal palmiyeler, ananas ve mangrov benzeri kıyı bitkileri güneşli iklimde gelişir." },
    Kagoshima: { lat: 35.6762, lon: 139.6503, region: "Kyushu", treeInfo: "Sakurajima yanardağının küllerine dayanıklı özel çam türleri ve yerel ağaçlar bulunur." },

    Okinawa: { lat: 26.2124, lon: 127.6809, region: "Okinawa", treeInfo: "Subtropikal iklime sahip Okinawa, devasa Ryukyu çamları ve mangrov ormanlarıyla kaplıdır; tayfun dönemlerinde rüzgar siperi görevi görür." },

    // --- DÜNYA / TÜRKİYE ŞEHİRLERİ ---
    Istanbul: { lat: 41.0082, lon: 28.9784, region: "Türkiye", treeInfo: "İstanbul'un tarihi parkları ve Boğaziçi hattı, zeytin, erguvan ve çam ağaçlarıyla kaplıdır; denizel etkiler bitki örtüsünü destekler." },
    Ankara: { lat: 39.9334, lon: 32.8597, region: "Türkiye", treeInfo: "Anadolu bozkır iklimine uyumlu dayanıklı iğne yapraklı karaçamlar ve park yeşillikleri yaygındır." },
    Rome: { lat: 41.9028, lon: 12.4964, region: "İtalya", treeInfo: "Akdeniz ikliminin tipik bitki örtüsü olan zeytinlikler, zakkumlar ve tarihi İtalyan taş çamları hakimdir." },
    Milan: { lat: 45.4642, lon: 9.1900, region: "İtalya", treeInfo: "Po vadisinin nemli ve verimli topraklarında kavak, meşe ve kestane ormanları yer alır." },
    Paris: { lat: 48.8566, lon: 2.3522, region: "Fransa", treeInfo: "Ilıman okyanusal iklimde cadde boylarını süsleyen kestane ve çınar ağaçları mevsime göre renk değiştirir." },
    London: { lat: 51.5074, lon: -0.1278, region: "İngiltere", treeInfo: "İngiltere'nin nemli ve yağışlı ikliminde meşe, gürgen ve dünyaca ünlü Londra çınarları (Platanus) yaygındır." }
};

function getWindDirectionText(degrees) {
    if (degrees === undefined) return "Bilinmiyor";
    const directions = ["Kuzey (N)", "Kuzeydoğu (NE)", "Doğu (E)", "Güneydoğu (SE)", "Güney (S)", "Güneybatı (SW)", "Batı (W)", "Kuzeybatı (NW)"];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
}

app.get('/api/weather/:city', async (req, res) => {
    const cityName = req.params.city;
    const coords = cityCoordinates[cityName];

    if (!coords) {
        return res.status(404).json({ error: 'Şehir bulunamadı.' });
    }

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover,visibility&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto`
        );
        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        function getWeatherDetails(code) {
            if (code === 0) return { text: "Açık / Güneşli", icon: "☀️", advice: "Hava pırıl pırıl ve güneşli! Güneş gözlüğünü takmayı ve dışarıda harika vakit geçirmeyi unutma." };
            if (code >= 1 && code <= 3) return { text: "Parçalı Bulutlu", icon: "⛅", advice: "Hava hafif bulutlu. Doğa yürüyüşleri ve ağaç gözlemleri için son derece keyifli bir ortam var." };
            if (code >= 45 && code <= 48) return { text: "Sisli / Puslu", icon: "🌫️", advice: "Ortamda sis hâkim. Görüş mesafesi düşük olduğu için trafikte ve park yollarında dikkatli ol." };
            if (code >= 51 && code <= 67) return { text: "Yağmurlu", icon: "🌧️", advice: "Yağmur geçişleri var! Dışarı çıkmadan önce mutlaka şemsiyeni yanına al, yapraklara can suyu oluyor." };
            if (code >= 71 && code <= 77) return { text: "Karlı", icon: "❄️️", advice: "Bölgeye kar yağıyor! Sıkı montunu giyin ve ağaçlardaki kar yüküne dikkat edin." };
            if (code >= 95) return { text: "Fırtınalı", icon: "⚡", advice: "Şiddetli fırtına uyarısı! Açık alandaki ağaçlardan ve devrilme riskinden uzak dur." };
            return { text: "Normal", icon: "🌤️", advice: "Hava dengeli, günlük planına güvenle devam edebilirsin." };
        }

        const weatherInfo = getWeatherDetails(current.weather_code);

        let irrigationStatus = "SULAMA YAPILABİLİR ✅";
        let irrigationReason = "Toprak nemi ve yağış seviyeleri tarım için uygun.";
        let sprayingStatus = "İLAÇLAMA UYGUNDUR ✅";
        let sprayingReason = "Rüzgar ve hava koşulları ilaçlama püskürtmeye elverişli.";

        const tomorrowRainSum = daily.precipitation_sum ? daily.precipitation_sum[1] : 0;
        if (current.precipitation > 0 || tomorrowRainSum > 1.5) {
            irrigationStatus = "SULAMA YAPMAYIN ❌";
            irrigationReason = `Yağış bekleniyor (~${tomorrowRainSum}mm). Su tasarrufu için bugün sulama iptal edilmeli.`;
            
            sprayingStatus = "İLAÇLAMA YAPMAYIN ❌";
            sprayingReason = "Yağmurlu havada ilaçlama yapraktan akıp gideceği için etkisiz olur.";
        } else if (current.wind_speed_10m > 20) {
            sprayingStatus = "İLAÇLAMA RİSKLİ ⚠️";
            sprayingReason = `Rüzgar hızı yüksek (${current.wind_speed_10m} km/s). İlaç etrafa savrulabilir.`;
        }

        const hourlyList = [];
        for (let i = 0; i < 24; i++) {
            const timeStr = data.hourly.time[i].split('T')[1];
            const detail = getWeatherDetails(data.hourly.weather_code[i]);
            hourlyList.push({
                time: timeStr,
                temp: Math.round(data.hourly.temperature_2m[i]),
                icon: detail.icon
            });
        }

        const dailyForecast = [];
        for (let i = 0; i < daily.time.length; i++) {
            const dInfo = getWeatherDetails(daily.weather_code[i]);
            dailyForecast.push({
                date: daily.time[i],
                maxTemp: Math.round(daily.temperature_2m_max[i]),
                minTemp: Math.round(daily.temperature_2m_min[i]),
                condition: dInfo.text,
                icon: dInfo.icon,
                rainSum: daily.precipitation_sum[i]
            });
        }

        res.json({
            city: cityName,
            region: coords.region,
            treeInfo: coords.treeInfo,
            temp: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            condition: weatherInfo.text,
            icon: weatherInfo.icon,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            windDirText: getWindDirectionText(current.wind_direction_10m),
            pressure: current.surface_pressure,
            cloudCover: current.cloud_cover,
            visibility: (current.visibility / 1000).toFixed(1),
            sunrise: daily.sunrise[0] ? daily.sunrise[0].split('T')[1] : "06:00",
            sunset: daily.sunset[0] ? daily.sunset[0].split('T')[1] : "18:00",
            aiAdvice: weatherInfo.advice,
            agricultural: {
                irrigation: irrigationStatus,
                irrigationReason: irrigationReason,
                spraying: sprayingStatus,
                sprayingReason: sprayingReason
            },
            hourly: hourlyList,
            daily: dailyForecast
        });

    } catch (error) {
        res.status(500).json({ error: 'Veri çekilemedi.' });
    }
});

app.listen(PORT, () => {
    console.log(`🔒 Sistem Tam Kadro (Japonya + Dünya Şehirleri) Çalışıyor: http://localhost:${PORT}`);
});