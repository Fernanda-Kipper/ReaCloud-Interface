import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { GTM_ID } from '../config';
import { useLocation } from 'react-router';

export function SetupGtm(){
  const { pathname } = useLocation();

  useEffect(() => {
    if(typeof document !== "undefined"){
      TagManager.initialize({ gtmId: GTM_ID });
    }
  },[])

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        'event': "gtm.historyChange",
        'gtm.historyChangeSource': 'pushState',
        'gtm.newUrl': window.location.href,
        'pathname': window.location.pathname,
        'newHistoryState': {
          'url': window.location.href,
        },
      }
    })
  },[pathname])

  return null;
}