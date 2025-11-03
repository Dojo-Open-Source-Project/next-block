import type { FC } from 'react'

export const Links: FC = () => {
  return (
    <div className="text-gray-500">
      <a href="https://freesamourai.com/" target="_blank" rel="noreferrer">
        #FreeSamourai
      </a>{' '}
      |{' '}
      <a
        href="https://github.com/wanderingking072/sentinel-android"
        target="_blank"
        rel="noreferrer"
      >
        Sentinel
      </a>{' '}
      |{' '}
      <a
        href="https://github.com/Dojo-Open-Source-Project"
        target="_blank"
        rel="noreferrer"
      >
        Dojo OSP
      </a>{' '}
      |{' '}
      <a href="https://paynym.rs" target="_blank" rel="noreferrer">
        Paynym.rs
      </a>{' '}
      |{' '}
      <a href="https://ashigaru.rs" target="_blank" rel="noreferrer">
        Ashigaru
      </a>
    </div>
  )
}
