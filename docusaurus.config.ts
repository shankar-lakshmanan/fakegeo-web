import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config';

const config: Config = {
  title: 'FakeGeo',
  tagline: 'Create rich, realistic geospatial data for showcasing, developing, and testing map applications.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://fakegeo.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  customFields: {
    fakegeoApiUrl: process.env.FAKEGEO_API_URL,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    xApiKey: process.env.X_API_KEY,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
    
  ],
  

  themeConfig: {
    metadata: [
      { name: 'keywords', content: 'fake geospatial data, map development, map testing, GIS tools, GeoJSON generator' },
      { name: 'keywords', content: 'spatial data API, geospatial tools, mapping APIs, fake data for maps' },
      { name: 'keywords', content: 'generate geospatial data, geospatial testing, map showcase tools' },
      { name: 'keywords', content: 'geospatial development, spatial data generator, GIS API' },
      { name: 'keywords', content: 'map features testing, GIS data generation, GeoJSON API' },
      { name: 'description', content: 'FakeGeo is an API to quickly generate rich geospatial data for map development, testing, and showcasing.' },
      { name: 'description', content: 'Simplify your GIS workflows with FakeGeo’s robust geospatial data generation.' },
      { name: 'description', content: 'Create custom geospatial data like points, polygons, and multi-features with ease using FakeGeo.' },
      { name: 'description', content: 'FakeGeo: Helping developers and GIS professionals simplify map-based projects.' },
      { name: 'author', content: 'FakeGeo Team' },
      { name: 'twitter:title', content: 'FakeGeo: Geospatial Data Generator' },
      { name: 'twitter:description', content: 'Generate geospatial data for map applications effortlessly.' },
      { name: 'twitter:image', content: 'https://fakegeo.com/assets/images/og-image.png' },
      { name: 'twitter:site', content: '@FakeGeo' },
      { name: 'og:type', content: 'website' },
      { name: 'og:title', content: 'FakeGeo: Simplifying Geospatial Data' },
      { name: 'og:description', content: 'Effortlessly generate geospatial data for maps and GIS applications.' },
      { name: 'og:url', content: 'https://fakegeo.com' },
      { name: 'og:image', content: 'https://fakegeo.com/assets/images/og-image.png' },
      { name: 'og:locale', content: 'en_US' },
      { name: 'robots', content: 'index, follow' },
      { name: 'canonical', content: 'https://fakegeo.com' },
      { name: 'keywords', content: 'test geospatial applications, data visualization, GIS development' },
      { name: 'keywords', content: 'fake GIS data generator, map feature development' },
      { name: 'keywords', content: 'map-based application API, geospatial mock data' },
      { name: 'keywords', content: 'GIS feature collections, GeoJSON generation' },
      { name: 'keywords', content: 'advanced geospatial data, grid polygons generator, GIS contour lines' },
      { name: 'keywords', content: 'multi-line GIS features, KML geospatial API' },
      { name: 'keywords', content: 'topojson generator, testing geospatial algorithms' },
      { name: 'keywords', content: 'random geospatial data generator, spatial development tools' },
      { name: 'keywords', content: 'GIS demo tools, mock data for mapping' },
      { name: 'keywords', content: 'custom geospatial datasets, fake geospatial API' },
      { name: 'keywords', content: 'lightweight GIS tools, efficient geospatial testing' },
      { name: 'keywords', content: 'map applications testing, geospatial bounding box generation' },
      { name: 'keywords', content: 'random point generator, spatial polygons API' },
      { name: 'keywords', content: 'GIS showcasing API, feature collection development' },
      { name: 'keywords', content: 'geospatial solutions, developer-friendly GIS tools' },
      { name: 'keywords', content: 'map visualization API, GIS debugging tools' },
      { name: 'keywords', content: 'geospatial multi-polygon generator, fast GIS solutions' },
      { name: 'keywords', content: 'GeoJSON testing, geospatial backend solutions' },
      { name: 'keywords', content: 'interactive geospatial data, map feature mockups' },
      { name: 'keywords', content: 'fake spatial datasets, GIS automation tools' },
      { name: 'keywords', content: 'GIS presentation API, fake feature generation' },
      { name: 'keywords', content: 'map testing helper, GeoJSON feature mock data' },
      { name: 'keywords', content: 'geospatial query API, quick GIS solutions' },
      { name: 'keywords', content: 'map builder API, dynamic geospatial data' },
    ],
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FakeGeo',
      logo: {
        alt: 'FakeGeo Logo',
        src: 'img/FakeGeoLogo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog/welcome', label: 'Blog', position: 'left'},
        {to: '/api', label: 'API', position: 'left'},
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        // @TODO - Uncomment this if/when api is made public on github
        // {
        //   href: 'https://github.com/fakegeo',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/introduction',
            },
            {
              label: 'API',
              to: '/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/fakegeo',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            // @TODO - Uncomment this if/when api is made public on github
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/fakegeo',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Demos Distributed LLC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fakegeo.com' } },
    { tagName: 'link', attributes: { rel: 'canonical', href: 'https://fakegeo.com' } },
    { tagName: 'meta', attributes: { name: 'theme-color', content: '#00A2FF' } },
    { tagName: 'meta', attributes: { name: 'og:title', content: 'FakeGeo: Geospatial Data API' } },
    { tagName: 'meta', attributes: { name: 'og:image', content: 'https://fakegeo.com/assets/og-image.png' } },
    { tagName: 'meta', attributes: { name: 'twitter:card', content: 'summary_large_image' } },
    { tagName: 'meta', attributes: { name: 'twitter:image', content: 'https://fakegeo.com/assets/images/twitter-card.png' } },
    { tagName: 'script', attributes: { type: 'application/ld+json' }, innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', url: 'https://fakegeo.com' }) },
    { tagName: 'script', attributes: { type: 'application/ld+json' }, innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'FakeGeo', url: 'https://fakegeo.com' }) },
    { tagName: 'meta', attributes: { name: 'keywords', content: 'geospatial tools, map testing, GIS API' } },
  ],
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-Y2164V8WHS', // Replace with your Google Analytics Measurement ID
      },
    ],
  ]
};

export default config;
