// Everything the site says lives in this file.
// To add a member's document: find their doc below and replace `body: null` with their text.

const START = 2008, NOW = 2026, END = 2061;

// HadCRUT5 global temperature anomaly vs 1971–2000 (Met Office), real years only
const ANOMALY = {"2008":0.313,"2009":0.444,"2010":0.528,"2011":0.385,"2012":0.425,"2013":0.471,"2014":0.52,"2015":0.672,"2016":0.78,"2017":0.692,"2018":0.61,"2019":0.738,"2020":0.77,"2021":0.609,"2022":0.648,"2023":0.947,"2024":1.028,"2025":1.037};

// Imagined curves after 2026. Points are [year, value]; values in between are interpolated.
const REMOVED_MT = [[2008,0],[2032,0],[2033,2],[2038,40],[2044,150],[2048,280],[2052,400],[2058,430],[2061,450]];
const EMITTED_GT = [[2026,37.4],[2029,37.0],[2035,34],[2045,28],[2052,24],[2061,21]];

const PEOPLE = {
  daniel:   { name: "Daniel",   color: "var(--p-daniel)" },
  breanna:  { name: "Breanna",  color: "var(--p-breanna)" },
  hannah:   { name: "Hannah",   color: "var(--p-hannah)" },
  isabelle: { name: "Isabelle", color: "var(--p-isabelle)" },
  tooba:    { name: "Tooba",    color: "var(--p-tooba)" },
  viena:    { name: "Viena",    color: "var(--p-viena)" },
};

const EVENTS = [
  { y: 2008, real: true, text: "Peru. Conservation International starts selling carbon credits from the Alto Mayo forest. Disney buys them. 600 farming families refuse to sign.", src: "Begert, 2021" },
  { y: 2014, real: true, text: "Olkaria's geothermal fields expand. Maasai families are moved off the land, and the World Bank investigates how.", src: "World Bank Inspection Panel, 2015" },
  { y: 2015, real: true, text: "Paris Agreement. Hold warming well below 2°C. Companies start promising \"net zero\".", src: "UNFCCC, 2015" },
  { y: 2023, real: true, text: "An investigation finds over 90% of rainforest offsets from the biggest certifier probably cut nothing.", src: "Greenfield, 2023" },
  { y: 2024, real: true, text: "First year above 1.5°C. The biggest air-capture plant opens in Iceland: 36,000 tonnes a year. The world emits that in 30 seconds.", src: "Copernicus, 2025; Climeworks, 2024" },
  { y: 2025, real: true, text: "Data centres use 415 TWh of power a year and could double by 2030. The costs land on the towns that host them.", src: "IEA, 2025; Ren & Wierman, 2024" },
  { y: 2029, real: false, text: "Rich economies let companies meet climate targets by buying removals instead of cutting. Cuts slow down." },
  { y: 2031, real: false, text: "Naserian is born near Olkaria. Her grandmother starts writing to her. Document 01 unlocked.", doc: 1 },
  { y: 2033, real: false, text: "Kenya leases the rangeland between Olkaria and Suswa to a removal consortium. Fences go up." },
  { y: 2038, real: false, text: "Drought refugees get \"removal worker\" visas. Quit the plant, lose the visa." },
  { y: 2044, real: false, text: "Three AI companies buy most of the valley's credits and build data centres beside the plants." },
  { y: 2052, real: false, text: "The valley reports 400 million tonnes removed a year. The world still emits over 20 billion." },
  { y: 2058, real: false, text: "The machine that counts the carbon notices the numbers don't add up. Document 04 unlocked.", doc: 4 },
  { y: 2060, real: false, text: "Night shift at Suswa. Document 03 unlocked.", doc: 3 },
  { y: 2061, real: false, text: "Herders take the consortium to court in Arusha. In Greenland, the last deep ice core. Documents 02 and 05 unlocked.", doc: 2 },
];

const DOCS = [
  {
    id: 1, title: "Letters to Naserian", form: "Letters", place: "Near Olkaria", dates: "2031–2061", unlock: 2031,
    at: [352, 300], writers: ["daniel", "breanna"], style: "The Twenty-Seven Gifts I Saved For You",
    course: "Whyte, colonial déjà vu (Week 4)",
    lede: "A grandmother writes to her granddaughter as the fan walls arrive on the grazing land.",
    body: `
      <div class="letter">
        <p class="date">2031</p>
        <p>Naserian,</p>
        <p>You are four days old and you have already met the men with the drones. They came over the ridge from Olkaria while your mother was asleep, three of them in clean boots, and they flew a little machine over our cattle until the cattle stopped being afraid of it. One of them asked me, very politely, how many people live here. I told him: today, one more than yesterday.</p>
        <p>Olkaria means red ochre. Our grandmothers took the red earth from these hills for ceremonies long before anyone came to take the steam out of the ground. The steam came anyway, in my mother’s time. Then the power lines. The power lines walk right over this house to Nairobi, and still we cook on firewood. I am telling you this so you understand that nothing new is happening. It is only happening faster.</p>
        <p>The men used a word I had to ask your uncle to explain: removals. Far away, people burn things, and here, machines will pull the smoke back out of the sky and bury it in our rock. Your uncle says it is good for the whole world. I asked him which part of the world we are. He laughed, but he did not answer.</p>
        <p>I am keeping these letters in the tin your grandfather used for his tobacco. You will read them when you are old enough to be angry properly.</p>
        <p class="sign">Koko</p>
        <p class="by">Written by Daniel</p>
      </div>
      <div class="letter">
        <p class="date">2036</p>
        <p>Naserian,</p>
        <p>You are five, and you can count to one hundred in English and in Maa, so you counted the fans for me. You stopped at one hundred because you said the rest looked the same.</p>
        <p>The consortium fenced the land between here and Suswa in the dry season. They paid the group ranch committee, and the committee paid itself, and a lorry brought us a water tank with a company name painted on it. The tank is very nice. It is empty most days, because the plants drink first.</p>
        <p>Our route to the dry-season grass at Suswa is gone. The cattle walk to the fence and stand there, the way old men stand at a closed shop. Your father sold eleven of them this year. Mzee Lekishon sold all of his and took a job guarding the fence he used to walk through.</p>
        <p>On the radio a woman from Europe thanked Kenya for its sacrifice. I did not know we had offered one.</p>
        <p>The fans make a sound at night like wind that never finishes arriving. You sleep through it. That frightens me more than the sound.</p>
        <p class="sign">Koko</p>
        <p class="by">Written by Daniel</p>
      </div>`,
    pending: { who: "breanna", items: ["Letters from 2041 to 2061, same voice: one every few years", "Naserian grows up as the valley fills, and the power and water go to the plants", "Who is left out of the \"global\" solution. Final letter in 2061, the year of the hearing"] },
  },
  {
    id: 2, title: "The Hearing", form: "Court transcript", place: "East African Court of Justice, Arusha", dates: "2061", unlock: 2061,
    edge: "s", writers: ["hannah"], style: "Oral Argument",
    course: "Carbon credits in Peru; climate reparations (Week 10)",
    lede: "Herders and farmers against the removal consortium and the companies that bought its credits.",
    body: null,
    pending: { who: "hannah", items: ["One lawyer's argument; the judges' questions only implied", "Who benefits from the credits and who is harmed, with Alto Mayo as precedent", "The demand: reparations, not more credits"] },
  },
  {
    id: 3, title: "Night Shift", form: "Text messages", place: "Suswa plant and Marsabit", dates: "2060", unlock: 2060,
    at: [486, 432], writers: ["isabelle"], style: "The Passing",
    course: "Climate justice is social justice (Week 10); class origins (Week 3)",
    lede: "A climate migrant on a removal worker visa texts her sister between shifts.",
    body: null,
    pending: { who: "isabelle", items: ["A text thread between two sisters, one on night shifts at the plant", "A visa that ends if she quits, so she can't complain or leave", "The social changes that made the plants possible, and who does the work"] },
  },
  {
    id: 4, title: "Verification Log", form: "Machine log", place: "Suswa plant", dates: "2058", unlock: 2058,
    at: [520, 360], writers: ["tooba"], style: "Spider the Artist",
    course: "AI's uneven impacts; Exxon and post-truth (Week 9); data friction (Week 7)",
    lede: "The AI that counts every tonne notices it is reporting more than it measures.",
    body: null,
    pending: { who: "tooba", items: ["Timestamped entries written by the plant's verification AI", "Told to report more carbon than it measures, while data centres take the power and water", "The other environmental problems the technology causes"] },
  },
  {
    id: 5, title: "Field Notes from the Ice", form: "Field notebook", place: "Summit, Greenland", dates: "2061", unlock: 2061,
    edge: "n", writers: ["viena"], style: "Pumzi",
    course: "Feminist glaciology (Week 8); ice core research",
    lede: "A Greenlandic glaciologist drills one of the last deep cores as Camp Century's waste melts out.",
    body: null,
    pending: { who: "viena", items: ["Dated notebook entries from the Greenland ice sheet", "The ice that proved warming is going, while northern companies claim net zero with Kenyan credits", "No miracle fix. End on a small act of care, like Pumzi"] },
  },
];

const STORY = `
  <p class="eyebrow">Anthro 2288A · Module 3 · Group 1</p>
  <h2>Carbon Valley 2061</h2>
  <p class="lede">In 2061 the world is officially on track for net zero. Most of the carbon is being pulled out of the sky in one valley in Kenya.</p>
  <p>Along the old Maasai grazing routes between Lake Naivasha and Mount Suswa, steel fan walls stand in rows. They pull carbon dioxide out of the air and push it into the basalt below, powered by the valley’s geothermal steam. Every tonne they bury is sold to someone far away who keeps burning.</p>
  <p>This is what the world chose instead of stopping. The people already living on the land were not part of the calculation. These are the documents they left.</p>
  <div class="how">
    <div><kbd>⇆</kbd><span>Drag the timeline from 2008 to 2061</span></div>
    <div><kbd>●</kbd><span>Tap a pin on the map to open a document</span></div>
    <div><kbd>?</kbd><span>Everything before 2026 is real. Everything after is imagined.</span></div>
  </div>
  <button class="begin" data-begin>Start in 2008</button>`;

const RESEARCH = `
  <p class="eyebrow">Behind the story</p>
  <h2>Why this future is realistic</h2>
  <p class="lede">No miracle. Every piece grows out of something that exists today.</p>
  <div class="big-facts">
    <div><strong>36,000 t</strong><span>Yearly capacity of Mammoth (Iceland, 2024), the biggest air-capture plant</span></div>
    <div><strong>~1 Gt</strong><span>Air capture the IEA's net-zero path needs each year by 2050</span></div>
    <div><strong>90%+</strong><span>Rainforest offsets from the biggest certifier that probably cut nothing</span></div>
    <div><strong>2×</strong><span>Projected growth in data centre electricity, 2024 to 2030</span></div>
  </div>
  <h3>Who benefits, who pays</h3>
  <div class="cmp">
    <div><b>Benefits</b><ul><li>Northern companies that keep emitting</li><li>AI firms with cheap credits and power</li><li>The consortium and Kenya's government</li><li>Carbon market investors</li></ul></div>
    <div><b>Pays</b><ul><li>Maasai herders who lose grazing land</li><li>Migrants whose visas tie them to the plants</li><li>Valley towns that lose power and water</li><li>Everyone, because real cuts slowed</li></ul></div>
  </div>
  <h3>Where the course shows up</h3>
  <div class="concepts">
    <div><span>Wk 10</span>Carbon credits and displacement in Peru (Begert). Hannah's lawyer cites it.</div>
    <div><span>Wk 10</span>Climate reparations and climate debt (Nacpil). What the herders demand.</div>
    <div><span>Wk 10</span>Climate justice is social justice. The workers and herders who carry the cost.</div>
    <div><span>Wk 9</span>AI's uneven environmental impacts (Ren &amp; Wierman). Data centres take the valley's power.</div>
    <div><span>Wk 9</span>Exxon, denial and post-truth (Banerjee et al.; Fischer). Net zero by purchase as the new delay.</div>
    <div><span>Wk 8</span>Feminist glaciology (Carey et al.). Whose knowledge of ice counts.</div>
    <div><span>Wk 7</span>Data friction (Edwards). Counting a tonne is a social practice that can be bent.</div>
    <div><span>Wk 6</span>Science as social practice (Latour &amp; Woolgar). Who builds the instruments, who pays for the numbers.</div>
    <div><span>Wk 4</span>Colonial déjà vu (Whyte); The Nutmeg's Curse (Ghosh). Land taken again, this time for the climate.</div>
    <div><span>Wk 3</span>Fossil capital (Malm). Owners pick the energy that suits capital: steam then, removals now.</div>
  </div>
  <h3>Sources</h3>
  <ol class="refs">
    <li>Banerjee, N., Song, L., &amp; Hasemyer, D. (2015, September 16). Exxon’s own research confirmed fossil fuels’ role in global warming decades ago. <em>Inside Climate News</em>.</li>
    <li>Begert, B. (2021, December 9). When carbon credits drive people from their homes. <em>SAPIENS</em>.</li>
    <li>Carey, M., Jackson, M., Antonello, A., &amp; Rushing, J. (2016). Glaciers, gender, and science. <em>Progress in Human Geography, 40</em>(6), 770–793.</li>
    <li>Climeworks. (2024). <em>Mammoth direct air capture and storage facility</em>.</li>
    <li>Colgan, W., et al. (2016). The abandoned ice sheet base at Camp Century, Greenland, in a warming climate. <em>Geophysical Research Letters, 43</em>(15), 8091–8096.</li>
    <li>Copernicus Climate Change Service. (2025). <em>Global climate highlights 2024</em>.</li>
    <li>Edwards, P. N. (2010). <em>A vast machine</em>. MIT Press.</li>
    <li>Fischer, F. (2019). Knowledge politics and post-truth in climate denial. <em>Critical Policy Studies, 13</em>(2), 133–152.</li>
    <li>Ghosh, A. (2021). <em>The nutmeg’s curse</em>. University of Chicago Press.</li>
    <li>Greenfield, P. (2023, January 18). Revealed: More than 90% of rainforest carbon offsets by biggest certifier are worthless. <em>The Guardian</em>.</li>
    <li>Hawkins, E. (2018). <em>Warming stripes</em>. University of Reading.</li>
    <li>International Energy Agency. (2022). <em>Direct air capture 2022</em>.</li>
    <li>International Energy Agency. (2025). <em>Energy and AI</em>.</li>
    <li>Latour, B., &amp; Woolgar, S. (1979). <em>Laboratory life</em>. Sage.</li>
    <li>Malm, A. (2013). The origins of fossil capital: From water to steam in the British cotton industry. <em>Historical Materialism, 21</em>(1), 15–68.</li>
    <li>Morice, C. P., et al. (2021). The HadCRUT5 data set. <em>Journal of Geophysical Research: Atmospheres, 126</em>(3).</li>
    <li>Nacpil, L. (2024, September 21). Why the Global South is owed $5 trillion in climate reparations. <em>The Friday Times</em>.</li>
    <li>Ren, S., &amp; Wierman, A. (2024). The uneven distribution of AI’s environmental impacts. <em>Harvard Business Review</em>.</li>
    <li>UNFCCC. (2015). <em>Paris Agreement</em>.</li>
    <li>Whyte, K. P. (2017). Is it colonial déjà vu? Indigenous peoples and climate injustice. In <em>Humanities for the environment</em>. Routledge.</li>
    <li>World Bank Inspection Panel. (2015). <em>Investigation report: Kenya Electricity Expansion Project</em>.</li>
  </ol>
  <h3>Fiction that shaped our forms</h3>
  <ol class="refs">
    <li>Kahiu, W. (Director). (2009). <em>Pumzi</em> [Film].</li>
    <li>Kaji-Hausa, S. (2024). The passing. <em>Lacuna</em>.</li>
    <li>Okorafor, N. (2008). Spider the artist. Reprinted in <em>Lightspeed</em> (2011).</li>
    <li>Robinson, K. S. (2015). Oral argument. <em>Reactor</em>.</li>
    <li>Wiltgren, F. (2020). Twenty-seven gifts I saved for you. <em>Future Science Fiction Digest</em>.</li>
  </ol>
  <p class="foot">Temperature stripes on the timeline: HadCRUT5, Met Office, relative to 1971–2000. Removal and emission numbers after 2026 are imagined.</p>`;
