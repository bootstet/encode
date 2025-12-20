/*
 * @Author: bootstet@163.com bootstet@163.com
 * @Date: 2025-04-14 16:26:27
 * @LastEditors: bootstet@163.com bootstet@163.com
 * @LastEditTime: 2025-12-19 15:03:01
 * @FilePath: /encode/docs/.vuepress/router.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import codingSidebar from './sidebar/codingSidebar.ts'
import engineeringSidebar from './sidebar/engineeringSidebar.ts'
import studySidebar from './sidebar/studySidebar.ts'
import npmSidebar from './sidebar/npmSidebar.ts'
import cliSidebar from './sidebar/cliSidebar.ts'
import perfSidebar from './sidebar/perfSidebar.ts'
import observabilitySidebar from './sidebar/observabilitySidebar.ts'
import securitySidebar from './sidebar/securitySidebar.ts'
import networkSidebar from './sidebar/networkSidebar.ts'
import miniappSidebar from './sidebar/miniappSidebar.ts'
import interviewSidebar from './sidebar/interviewSidebar.ts'
import qAaSidebar from './sidebar/qAa.ts'

module.exports = {
  '/coding/': codingSidebar,
  '/engineering/': engineeringSidebar,
  // 专题分栏（避免在 /components/ 下显示过多分组）
  '/components/perf/': perfSidebar,
  '/components/observability/': observabilitySidebar,
  '/components/security/': securitySidebar,
  '/components/network/': networkSidebar,
  '/components/miniapp/': miniappSidebar,
  '/components/qAa/': qAaSidebar,
  '/components/': studySidebar,
  '/npm/': npmSidebar,
  '/cli/': cliSidebar,
  '/interview/': interviewSidebar,
}
  
  
