
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
module.exports = {
  '/coding/': codingSidebar,
  '/engineering/': engineeringSidebar,
  // 专题分栏（避免在 /components/ 下显示过多分组）
  '/components/perf/': perfSidebar,
  '/components/observability/': observabilitySidebar,
  '/components/security/': securitySidebar,
  '/components/network/': networkSidebar,
  '/components/miniapp/': miniappSidebar,
  '/components/': studySidebar,
  '/npm/': npmSidebar,
  '/cli/': cliSidebar,
  '/interview/': interviewSidebar,
}
  
  
