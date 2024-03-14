import clsx from 'clsx'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation, TopHeader } from '~/components'
import withRouter from '~/hocs/withRouter'

const PublicLayout = ({location}) => {
  return (
    <main>
        <TopHeader/>
        <Navigation/>
        <div className={clsx(location.pathname != '/' ? 'pt-[170px]' : 'pt-0' )}>
            <Outlet />  {/*  When path == home => outlet == home */}
        </div>
    </main>
  )
}

export default withRouter(PublicLayout)

