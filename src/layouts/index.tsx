import { Outlet, useLocation, history } from 'umi'
import { Layout, Nav, Button } from '@douyinfe/semi-ui'
import { IconSemiLogo, IconBell, IconHelpCircle } from '@douyinfe/semi-icons'
import './global.scss'

const navItems = [
  { itemKey: '/', text: '首页' },
  {
    text: '表单',
    itemKey: 'form',
    items: [
      {
        text: '基础表单',
        itemKey: 'form/basic'
      }
    ]
  },
  {
    text: '响应式',
    itemKey: 'reactive',
    items: [
      {
        text: '基础',
        itemKey: 'reactive/basic'
      }
    ]
  }
]

const findItem = (items, keys: string[]) => {
  const item = items.find((item) => item.itemKey === keys[0])

  if (item) {
    if (keys?.length > 1) {
      const found = findItem(item.items, keys.slice(1))
      return found || keys[0]
    } else {
      return keys[0]
    }
  }

  return null
}

const getPath = (items, key: string) => {
  let result = []

  const loop = (subItems, pathArr) => {
    if (!subItems?.length) return

    const item = subItems.find((item) => item.itemKey === key)

    if (item) {
      result = [...pathArr, item.itemKey]
      return
    }

    subItems.forEach((item) => {
      if (item?.items?.length) {
        loop(item.items, [...pathArr, item.itemKey])
      }
    })
  }

  loop(items, [])

  console.log('🔥 result', result)

  return result[0] === '/' ? '/' : '/' + result.join('/')
}

export default () => {
  const { Header, Footer, Sider, Content } = Layout
  const { pathname } = useLocation()

  const selectedKeys = pathname === '/' ? '/' : pathname.replace(/^\//, '')
  console.log('🔥 selectedKeys', selectedKeys)

  return (
    <div className="flex flex-col justify-center h-full text-center align-middle">
      <Layout>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav mode="horizontal">
            <Nav.Header>
              <IconSemiLogo style={{ width: '64px', height: '36px', fontSize: 36 }} />
              <div className="text-lg font-semibold">Formily Semi Demos</div>
            </Nav.Header>
            <Nav.Footer>
              <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px'
                }}
              />
              <Button
                theme="borderless"
                icon={<IconHelpCircle size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px'
                }}
              />
            </Nav.Footer>
          </Nav>
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav
              selectedKeys={[selectedKeys]}
              onSelect={(data) => {
                // const path = getPath(navItems, data.itemKey as string)
                history.push(data.itemKey === '/' ? '/' : (('/' + data.itemKey) as string))
              }}
              style={{ maxWidth: 220, height: '100%' }}
              items={navItems}
              footer={{
                collapseButton: true
              }}
            />
          </Sider>
          <Content
            style={{
              padding: '24px',
              backgroundColor: 'var(--semi-color-bg-0)'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
