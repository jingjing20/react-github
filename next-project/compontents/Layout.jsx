import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Avatar, Layout, Input } from 'antd'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import Container from './Container'
const { Header, Content, Footer } = Layout

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}
const footerStyle = {
  textAlign: 'center'
}

export default ({ children }) => {

  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value)
  }, [])

  const handleOnSearch = useCallback(() => { }, [])

  return (
    <Layout>
      <Header>
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle} />
            </div>
            <div>
              <Input.Search placeholder="搜索仓库" value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar icon={<UserOutlined />} size={40} />
            </div>
          </div>
        </div>
      </Header>

      <Content>{children}</Content>

      <Footer style={footerStyle}>
        Develop by  @ <a href="http://blog.jinghao.xyz/">JingJing</a>-2020
      </Footer>
      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }
          .ant-layout {
            min-height: 100%;
          }
        `}
      </style>
    </Layout>
  )
}