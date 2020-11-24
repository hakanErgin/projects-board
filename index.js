const express = require('express');
const jsonGraphqlExpress = require('json-graphql-server');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const PORT = 5000;
const app = express();
const data = {
  projects: [
    {
      id: 1,
      name: 'Sub-Ex',
      enterprise_id: 1,
    },
    {
      id: 2,
      name: 'Span',
      enterprise_id: 5,
    },
    {
      id: 3,
      name: 'Home Ing',
      enterprise_id: 2,
    },
    {
      id: 4,
      name: 'Treeflex',
      enterprise_id: 5,
    },
    {
      id: 5,
      name: 'Project-xx',
      enterprise_id: 1,
    },
  ],
  enterprises: [
    {
      id: 1,
      name: 'Quop',
    },
    {
      id: 2,
      name: 'Blogspan',
    },
    {
      id: 3,
      name: 'Jamia',
    },
    {
      id: 4,
      name: 'Meezzy',
    },
    {
      id: 5,
      name: 'Skinix',
    },
  ],
  users: [
    {
      id: 1,
      first_name: 'Shellie',
      last_name: 'Lapish',
      email: 'slapish0@ovh.net',
      avatar: 'https://robohash.org/omnisutcum.jpg?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 2,
      first_name: 'Nettie',
      last_name: 'Ions',
      email: 'nions1@kickstarter.com',
      avatar: 'https://robohash.org/magnamenimvero.bmp?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 3,
      first_name: 'Griffith',
      last_name: 'Grassin',
      email: 'ggrassin2@exblog.jp',
      avatar: 'https://robohash.org/sitdolortempore.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 4,
      first_name: 'Wallis',
      last_name: 'Joskowicz',
      email: 'wjoskowicz3@cdbaby.com',
      avatar: 'https://robohash.org/undenisinihil.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 5,
      first_name: 'Dominica',
      last_name: 'Clover',
      email: 'dclover4@cpanel.net',
      avatar:
        'https://robohash.org/voluptatemmolestiasnatus.jpg?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 6,
      first_name: 'Wanda',
      last_name: 'McKibben',
      email: 'wmckibben5@oracle.com',
      avatar:
        'https://robohash.org/temporeexercitationemlabore.png?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 7,
      first_name: 'Susi',
      last_name: 'House',
      email: 'shouse6@princeton.edu',
      avatar: 'https://robohash.org/sintnonbeatae.jpg?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 8,
      first_name: 'Annecorinne',
      last_name: 'Dalmon',
      email: 'adalmon7@blogtalkradio.com',
      avatar: 'https://robohash.org/veniametvelit.png?size=50x50&set=set1',
      project_id: 4,
    },
    {
      id: 9,
      first_name: 'Demetrius',
      last_name: 'Beauvais',
      email: 'dbeauvais8@buzzfeed.com',
      avatar: 'https://robohash.org/utomnissed.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 10,
      first_name: 'Valentino',
      last_name: 'Sears',
      email: 'vsears9@sciencedaily.com',
      avatar:
        'https://robohash.org/itaquevoluptatesiste.bmp?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 11,
      first_name: 'Xever',
      last_name: 'Greiswood',
      email: 'xgreiswooda@hexun.com',
      avatar:
        'https://robohash.org/temporibusprovidentea.png?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 12,
      first_name: 'Holt',
      last_name: 'Lathwell',
      email: 'hlathwellb@amazon.co.jp',
      avatar: 'https://robohash.org/esseettemporibus.bmp?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 13,
      first_name: 'Lilias',
      last_name: 'Hicken',
      email: 'lhickenc@rambler.ru',
      avatar:
        'https://robohash.org/repudiandaeisteomnis.jpg?size=50x50&set=set1',
      project_id: 5,
    },
    {
      id: 14,
      first_name: 'Ryann',
      last_name: 'MacAskie',
      email: 'rmacaskied@bluehost.com',
      avatar:
        'https://robohash.org/officiisiustosuscipit.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 15,
      first_name: 'La verne',
      last_name: 'Bowdery',
      email: 'lbowderye@slashdot.org',
      avatar:
        'https://robohash.org/estipsaexercitationem.bmp?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 16,
      first_name: 'Pauline',
      last_name: 'Brickham',
      email: 'pbrickhamf@360.cn',
      avatar: 'https://robohash.org/hicestrepellendus.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 17,
      first_name: 'Farica',
      last_name: 'Zanussii',
      email: 'fzanussiig@hc360.com',
      avatar: 'https://robohash.org/etmagnampariatur.bmp?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 18,
      first_name: 'Garey',
      last_name: 'Tristram',
      email: 'gtristramh@ebay.co.uk',
      avatar: 'https://robohash.org/quiinventoresit.jpg?size=50x50&set=set1',
      project_id: 5,
    },
    {
      id: 19,
      first_name: 'Kenn',
      last_name: 'Zambon',
      email: 'kzamboni@twitpic.com',
      avatar: 'https://robohash.org/nequeodioipsa.png?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 20,
      first_name: 'Glenn',
      last_name: 'Gehrels',
      email: 'ggehrelsj@tripadvisor.com',
      avatar:
        'https://robohash.org/aliquidvoluptatemin.bmp?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 21,
      first_name: 'Molly',
      last_name: 'Tommasetti',
      email: 'mtommasettik@typepad.com',
      avatar:
        'https://robohash.org/quiavoluptatemdolore.png?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 22,
      first_name: 'Wallas',
      last_name: 'Lodemann',
      email: 'wlodemannl@yelp.com',
      avatar:
        'https://robohash.org/voluptasveniamearum.jpg?size=50x50&set=set1',
      project_id: 4,
    },
    {
      id: 23,
      first_name: 'Jacquenetta',
      last_name: 'McGiffin',
      email: 'jmcgiffinm@t.co',
      avatar:
        'https://robohash.org/nihilvoluptatesvoluptatem.bmp?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 24,
      first_name: 'Knox',
      last_name: 'Aldhouse',
      email: 'kaldhousen@t-online.de',
      avatar: 'https://robohash.org/uteiusvoluptate.jpg?size=50x50&set=set1',
      project_id: 5,
    },
    {
      id: 25,
      first_name: 'Daphne',
      last_name: 'Roke',
      email: 'drokeo@wp.com',
      avatar:
        'https://robohash.org/quidemconsequaturquia.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 26,
      first_name: 'Jamil',
      last_name: 'Lincke',
      email: 'jlinckep@wufoo.com',
      avatar:
        'https://robohash.org/porronisivoluptatem.jpg?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 27,
      first_name: 'Marya',
      last_name: 'Cheeke',
      email: 'mcheekeq@clickbank.net',
      avatar: 'https://robohash.org/auteumipsum.bmp?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 28,
      first_name: 'Lotty',
      last_name: 'Josuweit',
      email: 'ljosuweitr@mtv.com',
      avatar: 'https://robohash.org/nostrumetdolore.bmp?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 29,
      first_name: 'Etty',
      last_name: 'Wooster',
      email: 'ewoosters@lycos.com',
      avatar: 'https://robohash.org/accusamusrationeut.png?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 30,
      first_name: 'Augustine',
      last_name: 'Martijn',
      email: 'amartijnt@tiny.cc',
      avatar: 'https://robohash.org/absintsit.bmp?size=50x50&set=set1',
      project_id: 4,
    },
    {
      id: 31,
      first_name: 'Staford',
      last_name: 'Tubby',
      email: 'stubbyu@about.com',
      avatar: 'https://robohash.org/autcumunde.bmp?size=50x50&set=set1',
      project_id: 1,
    },
    {
      id: 32,
      first_name: 'Estele',
      last_name: 'Perez',
      email: 'eperezv@jigsy.com',
      avatar:
        'https://robohash.org/corporiseiustenetur.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 33,
      first_name: 'Clarissa',
      last_name: 'Doorly',
      email: 'cdoorlyw@51.la',
      avatar:
        'https://robohash.org/estconsequunturdoloremque.jpg?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 34,
      first_name: 'Maria',
      last_name: 'Legonidec',
      email: 'mlegonidecx@usatoday.com',
      avatar: 'https://robohash.org/ipsavelitqui.jpg?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 35,
      first_name: 'Kippie',
      last_name: 'Dillingham',
      email: 'kdillinghamy@1und1.de',
      avatar:
        'https://robohash.org/quiliberoasperiores.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 36,
      first_name: 'Freeland',
      last_name: 'Ahmad',
      email: 'fahmadz@homestead.com',
      avatar: 'https://robohash.org/autemsiterror.jpg?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 37,
      first_name: 'Aloin',
      last_name: 'Gerb',
      email: 'agerb10@imgur.com',
      avatar: 'https://robohash.org/saepesuscipitiure.bmp?size=50x50&set=set1',
      project_id: 2,
    },
    {
      id: 38,
      first_name: 'Delilah',
      last_name: 'Vink',
      email: 'dvink11@about.me',
      avatar: 'https://robohash.org/adipiscietqui.png?size=50x50&set=set1',
      project_id: 3,
    },
    {
      id: 39,
      first_name: 'Lois',
      last_name: 'Scarasbrick',
      email: 'lscarasbrick12@uol.com.br',
      avatar: 'https://robohash.org/sitdoloremqueipsum.bmp?size=50x50&set=set1',
      project_id: 5,
    },
    {
      id: 40,
      first_name: 'Ian',
      last_name: 'Myrie',
      email: 'imyrie13@baidu.com',
      avatar:
        'https://robohash.org/excepturioccaecaticorporis.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 41,
      first_name: 'Dennison',
      last_name: 'Malloy',
      email: 'dmalloy14@virginia.edu',
      avatar: 'https://robohash.org/namomnisquibusdam.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 42,
      first_name: 'Doris',
      last_name: 'Lokier',
      email: 'dlokier15@businesswire.com',
      avatar:
        'https://robohash.org/modieligendivoluptate.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 43,
      first_name: 'Karlan',
      last_name: 'Burburough',
      email: 'kburburough16@soup.io',
      avatar:
        'https://robohash.org/molestiasillumvelit.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 44,
      first_name: 'Ezechiel',
      last_name: 'Oaker',
      email: 'eoaker17@altervista.org',
      avatar: 'https://robohash.org/saepequoillum.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 45,
      first_name: 'Kari',
      last_name: 'Rosenhaus',
      email: 'krosenhaus18@spiegel.de',
      avatar: 'https://robohash.org/inciduntnonharum.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 46,
      first_name: 'Rudiger',
      last_name: 'Showt',
      email: 'rshowt19@devhub.com',
      avatar: 'https://robohash.org/possimusquiaomnis.jpg?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 47,
      first_name: 'Finley',
      last_name: 'Wackley',
      email: 'fwackley1a@google.co.uk',
      avatar: 'https://robohash.org/sitarchitectosit.bmp?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 48,
      first_name: 'Scott',
      last_name: 'Webburn',
      email: 'swebburn1b@army.mil',
      avatar:
        'https://robohash.org/rerumipsumprovident.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 49,
      first_name: 'Kaia',
      last_name: 'Kidson',
      email: 'kkidson1c@dailymail.co.uk',
      avatar: 'https://robohash.org/sintvoluptatemsed.png?size=50x50&set=set1',
      project_id: null,
    },
    {
      id: 50,
      first_name: 'Kipp',
      last_name: 'Croson',
      email: 'kcroson1d@macromedia.com',
      avatar:
        'https://robohash.org/voluptatibusnonvoluptas.jpg?size=50x50&set=set1',
      project_id: null,
    },
  ],
};
app.use(cors());
app.use(express.static('build'));

app.use('/graphql', jsonGraphqlExpress.default(data));
app.listen(process.env.PORT || PORT);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
