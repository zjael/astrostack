import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

// @ts-ignore
const Layout = ({ children }: Args) => <RootLayout config={configPromise}>{children}</RootLayout>

export default Layout