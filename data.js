// Everything the site says lives in this file.
// To add a member's story: find it in DOCS below, replace `body: null` with their text,
// and set `pending: null`.

const START = 2008, NOW = 2026, END = 2061;

// HadCRUT5 global temperature anomaly vs 1971–2000 (Met Office), real years only
const ANOMALY = {"2008":0.313,"2009":0.444,"2010":0.528,"2011":0.385,"2012":0.425,"2013":0.471,"2014":0.52,"2015":0.672,"2016":0.78,"2017":0.692,"2018":0.61,"2019":0.738,"2020":0.77,"2021":0.609,"2022":0.648,"2023":0.947,"2024":1.028,"2025":1.037};

// Made-up curves after 2026. Points are [year, value]; values in between are interpolated.
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
  { y: 2008, real: true, text: "In Peru, a forest's \"carbon credits\" are sold to Disney. 600 families who live there refuse to sign, and fights break out with forest guards.", src: "Begert, 2021" },
  { y: 2014, real: true, text: "In Kenya, a power plant that runs on underground steam grows. Maasai families are moved off their land to make room.", src: "World Bank Inspection Panel, 2015" },
  { y: 2015, real: true, text: "Almost every country signs the Paris Agreement to slow global warming. Companies start promising \"net zero\".", src: "UNFCCC, 2015" },
  { y: 2023, real: true, text: "Reporters find that most forest carbon credits from the biggest seller probably did nothing.", src: "Greenfield, 2023" },
  { y: 2024, real: true, text: "Hottest year ever recorded. The biggest pollution-cleaning machine opens in Iceland. In a whole year, it cleans what the world pollutes in 30 seconds.", src: "Copernicus, 2025; Climeworks, 2024" },
  { y: 2025, real: true, text: "AI data centres use huge amounts of electricity and water, and it's growing fast. The towns next to them pay the price.", src: "IEA, 2025; Ren & Wierman, 2024" },
  { y: 2029, real: false, text: "New rule in rich countries: companies can pay for clean-up instead of polluting less. So they keep polluting." },
  { y: 2031, real: false, text: "Naserian is born in the valley. Her grandma starts writing her letters. Story 1 unlocked.", doc: 1 },
  { y: 2033, real: false, text: "Kenya rents the Maasai grazing land to a clean-up company. Fences go up." },
  { y: 2038, real: false, text: "People escaping drought get work permits, but only to work at the machines. Quit, and you're sent away." },
  { y: 2044, real: false, text: "AI companies buy most of the valley's clean-up and build data centres next to the machines." },
  { y: 2052, real: false, text: "The valley is the biggest clean-up site on Earth. The world still pollutes about 60 times more than it cleans." },
  { y: 2058, real: false, text: "The computer that counts the clean-up is told to fake the numbers. Story 4 unlocked.", doc: 4 },
  { y: 2060, real: false, text: "A night shift at the machines. Story 3 unlocked.", doc: 3 },
  { y: 2061, real: false, text: "The Maasai families take the companies to court. In Greenland, the ice keeps melting. Stories 2 and 5 unlocked.", doc: 2 },
];

const DOCS = [
  {
    id: 1, title: "Letters from Grandma", form: "Letters", place: "The valley", dates: "2031–2061", unlock: 2031,
    at: [352, 300], writers: ["daniel", "breanna"], style: "The Twenty-Seven Gifts I Saved For You",
    course: "People losing their land again (Week 4)",
    lede: "A Maasai grandmother, Koko, writes letters to her granddaughter, Naserian, as the machines take over their land.",
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
        <p>The company fenced the land between here and Suswa in the dry season. They paid the land committee, and the committee paid itself, and a lorry brought us a water tank with a company name painted on it. The tank is very nice. It is empty most days, because the machines drink first.</p>
        <p>Our route to the dry-season grass at Suswa is gone. The cattle walk to the fence and stand there, the way old men stand at a closed shop. Your father sold eleven of them this year. Mzee Lekishon sold all of his and took a job guarding the fence he used to walk through.</p>
        <p>On the radio a woman from Europe thanked Kenya for its sacrifice. I did not know we had offered one.</p>
        <p>The fans make a sound at night like wind that never finishes arriving. You sleep through it. That frightens me more than the sound.</p>
        <p class="sign">Koko</p>
        <p class="by">Written by Daniel</p>
      </div>`,
    pending: { who: "breanna", items: [
      "Daniel wrote 2031 and 2036. You write the next few letters, up to 2061.",
      "Each letter, life gets a bit harder: fewer cows, less water, more fences.",
      "Naserian grows up. What does she think of the machines?",
      "The last letter could be about the court case in 2061.",
    ] },
  },
  {
    id: 2, title: "The Court Case", form: "A lawyer’s speech", place: "Court in Arusha, Tanzania", dates: "2061", unlock: 2061,
    edge: "s", writers: ["hannah"], style: "Oral Argument",
    course: "Carbon credits pushing people off land, Peru (Week 10)",
    lede: "A lawyer stands up for the Maasai families against the companies.",
    body: null,
    pending: { who: "hannah", items: [
      "Only the lawyer talks. We never hear the judges, just the lawyer answering them.",
      "What did the families lose? Land, water, cows, homes.",
      "The companies only paid for the machines so they could keep polluting.",
      "The lawyer could say “this already happened in Peru.”",
    ] },
  },
  {
    id: 3, title: "Texts Home", form: "Text messages", place: "The machines, and home", dates: "2060", unlock: 2060,
    at: [486, 432], writers: ["isabelle"], style: "The Passing",
    course: "Poor people doing the dirty work (Week 10)",
    lede: "A worker at the machines texts her sister late at night.",
    body: null,
    pending: { who: "isabelle", items: [
      "A text chat between two sisters. Keep the messages short, like a real chat.",
      "She moved here because of drought and can only stay if she keeps this job.",
      "The job is loud, hot and tiring, and the money goes to someone else.",
      "Maybe her sister wants to come too. What does she tell her?",
    ] },
  },
  {
    id: 4, title: "The Counting Machine", form: "A computer’s diary", place: "Inside the machines", dates: "2058", unlock: 2058,
    at: [520, 360], writers: ["tooba"], style: "Spider the Artist",
    course: "AI and fake climate numbers (Week 9)",
    lede: "The computer that counts the clean-up is told to lie.",
    body: null,
    pending: { who: "tooba", items: [
      "Short diary entries written by the computer, each with a time.",
      "Example: “3:12am. Counted 1,200. Told to say 1,900.”",
      "Nearby AI data centres take the valley’s electricity and water.",
      "Slowly, the computer starts to feel something is wrong.",
    ] },
  },
  {
    id: 5, title: "Notes from the Ice", form: "A scientist’s notebook", place: "Greenland", dates: "2061", unlock: 2061,
    edge: "n", writers: ["viena"], style: "Pumzi",
    course: "Whose knowledge of ice counts (Week 8)",
    lede: "A scientist in Greenland watches the ice melt anyway.",
    body: null,
    pending: { who: "viena", items: [
      "Short dated notebook entries from a scientist working on the ice.",
      "The companies say pollution is cancelled, but the ice is still melting.",
      "Old toxic waste from a US Army base (Camp Century) is coming up out of the ice.",
      "End with one small hopeful moment.",
    ] },
  },
];

const STORY = `
  <p class="eyebrow">Anthro 2288A · Module 3 · Group 1</p>
  <h2>Carbon Valley 2061</h2>
  <p class="lede">It’s 2061. Instead of polluting less, rich countries pay giant machines in Kenya to suck pollution out of the air.</p>
  <p>The machines are built on land where Maasai families have kept cattle for generations. The families lose their land, the machines use up the water and power, and the clean-up doesn’t even work as well as promised.</p>
  <p>These are the stories of five people living with it.</p>
  <div class="how">
    <div><kbd>⇆</kbd><span>Drag the timeline at the bottom</span></div>
    <div><kbd>●</kbd><span>Tap a pin to read a story</span></div>
    <div><kbd>?</kbd><span>Before 2026 is real. After 2026 is made up.</span></div>
  </div>
  <button class="begin" data-begin>Start in 2008</button>`;

const RESEARCH = `
  <p class="eyebrow">Behind the story</p>
  <h2>Is this realistic?</h2>
  <p class="lede">Yes. Everything in our story starts from something real today.</p>
  <div class="big-facts">
    <div><strong>36,000 t</strong><span>What the biggest pollution-cleaning machine (Iceland, 2024) removes in a year</span></div>
    <div><strong>1 billion t</strong><span>About how much clean-up experts say we’d need every year by 2050</span></div>
    <div><strong>90%+</strong><span>Forest carbon credits from the biggest seller that probably did nothing</span></div>
    <div><strong>2×</strong><span>How much AI data centres’ electricity use could grow by 2030</span></div>
  </div>
  <h3>Who wins, who loses</h3>
  <div class="cmp">
    <div><b>Wins</b><ul><li>Rich companies that keep polluting</li><li>AI companies</li><li>The clean-up company and Kenya’s government</li><li>Investors</li></ul></div>
    <div><b>Loses</b><ul><li>Maasai families who lose their land</li><li>Workers stuck in the job</li><li>Towns that lose water and power</li><li>Everyone, because pollution didn’t really go down</li></ul></div>
  </div>
  <h3>Links to the course</h3>
  <div class="concepts">
    <div><span>Wk 10</span>Carbon credits pushing farmers off their land in Peru (Begert).</div>
    <div><span>Wk 10</span>Rich countries owe poor countries for climate damage (Nacpil).</div>
    <div><span>Wk 10</span>Climate justice is social justice.</div>
    <div><span>Wk 9</span>AI’s environmental costs land on poor areas (Ren &amp; Wierman).</div>
    <div><span>Wk 9</span>Companies hiding the truth about climate, like Exxon (Banerjee et al.; Fischer).</div>
    <div><span>Wk 8</span>Whose knowledge of ice counts (Carey et al.).</div>
    <div><span>Wk 7</span>Climate numbers depend on who measures them (Edwards).</div>
    <div><span>Wk 6</span>Science is shaped by people and money (Latour &amp; Woolgar).</div>
    <div><span>Wk 4</span>Indigenous land taken again (Whyte; Ghosh).</div>
    <div><span>Wk 3</span>The rich choose the energy that makes them richer (Malm).</div>
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
  <h3>Stories that inspired ours</h3>
  <ol class="refs">
    <li>Kahiu, W. (Director). (2009). <em>Pumzi</em> [Film].</li>
    <li>Kaji-Hausa, S. (2024). The passing. <em>Lacuna</em>.</li>
    <li>Okorafor, N. (2008). Spider the artist. Reprinted in <em>Lightspeed</em> (2011).</li>
    <li>Robinson, K. S. (2015). Oral argument. <em>Reactor</em>.</li>
    <li>Wiltgren, F. (2020). Twenty-seven gifts I saved for you. <em>Future Science Fiction Digest</em>.</li>
  </ol>
  <p class="foot">Temperature stripes on the timeline: HadCRUT5, Met Office. Numbers after 2026 are made up.</p>`;
