import type { Metadata } from 'next';
import { FC } from 'react';
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  params: {
    segments: string[]
  }
  searchParams: {
    [key: string]: string | string[]
  }
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page: FC<Args> = ({ params, searchParams }: Args) => RootPage({ config, params, searchParams })
export default Page;