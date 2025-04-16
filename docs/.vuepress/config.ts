import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config';
const routerPath = require('./router.js')

export default defineConfig4CustomTheme({
	locales: {
		'/': {
			lang: 'zh-CN',
			title: 'bootstet',
			description: '前端编码规范工程化',
		},
	},
	base: '/encode/',
	themeConfig: {
		nav: [
			{ text: '首页', link: '/index.md' },
			{
				text: '编码规范',
				items: [
					{ text: 'HTML 编码规范', link: '/coding/html.md' },
					{ text: 'CSS 编码规范', link: '/coding/css.md' },
					{ text: 'JavaScript 编码规范', link: '/coding/javascript.md' },
					{ text: 'Node 编码规范', link: '/coding/node.md' },
					{ text: 'Typescript 编码规范', link: '/coding/typescript.md' },
				],
			},
			{
				text: '工程规范',
				items: [
					{ text: 'Git 规范', link: '/engineering/git.md' },
					{ text: '文档规范', link: '/engineering/doc.md' },
					{ text: 'CHANGELOG 规范', link: '/engineering/changelog.md' },
				],
			},
			{
				text: 'study',
				items:[
					{ text: 'JavaScript深度剖析', link: '/components/page/funPro.md' },
					{ text: 'typeScript', link: '/components/ts/typescript.md' },
					{ text: '设计模式', link: '/components/question/design.md' },
					{ text: '前端工程化', link: '/components/engineering/' },
					{ text: 'vue', link: '/components/vue/vueBase' },
					{ text: 'react', link: '/components/react/basics1.md' },
					{ text: 'node', link: '/components/node/basic.md' },
					{ text: '面试题', link: '/components/question/proAndAsync.md' },
					{ text: '面试题整理', link: '/components/browser/browser.md' },
					{ text: '常见问题记录', link: '/components/article/bokeinit.md' },
				]
			}
		],
		sidebar: routerPath,
		logo: '/img/logo.jpeg',
		repo: 'bootstet/encode',
		searchMaxSuggestions: 10,
		docsDir: 'docs',
		footer: {
			createYear: 2024,
			copyrightInfo:
				'encode studio | <a href="https://github.com/bootstet/encode" target="_blank">github</a>',
		},

		extendFrontmatter: {
			author: {
				name: 'bootstet',
				link: 'https://github.com/bootstet/encode',
			},
		},
	},

	head: [
		['link', { rel: 'icon', href: '/img/logo.jpeg' }],
		[
			'meta',
			{
				name: 'keywords',
				content: '前端编码规范工程化',
			},
		],
	],

	plugins: <UserPlugins>[
		[
			'one-click-copy',
			{
				copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
				copyMessage: '复制成功',
				duration: 1000,
				showInMobile: false,
			},
		],

		[
			'vuepress-plugin-zooming',
			{
				selector: '.theme-vdoing-content img:not(.no-zoom)',
				options: {
					bgColor: 'rgba(0,0,0,0.6)',
				},
			},
		],
	],
	extraWatchFiles: ['.vuepress/config.ts'],
});
