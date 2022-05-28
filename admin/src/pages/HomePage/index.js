import React, { useCallback, useEffect, useState, useRef } from 'react';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Loader } from '@strapi/design-system/Loader';
import { Main } from '@strapi/design-system/Main';
import { Typography } from '@strapi/design-system/Typography';
import Upload from '@strapi/icons/Upload';
import { LoadingIndicatorPage, request } from '@strapi/helper-plugin';

import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

import pluginId from '../../pluginId';

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useIntl();

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const timeoutRef = useRef();

  const checkBusy = useCallback(async () => {
    const { busy } = await request(`/${pluginId}/check`, { method: 'GET' });
    setBusy(busy);

    timeoutRef.current = setTimeout(checkBusy, POLL_INTERVAL);
  }, []);

  useEffect(() => {
    checkBusy();
    setReady(true);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [checkBusy]);

  const triggerPublish = async () => {
    clearTimeout(timeoutRef.current);
    setBusy(true);

    await request(`/${pluginId}/publish`, { method: 'GET' });

    checkBusy();
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({
        id: getTrad('home.prompt.confirm'),
        defaultMessage: 'Are you sure you wish to publish?',
      })
    );

    if (ok) triggerPublish();
  };

  if (!ready) return <LoadingIndicatorPage />;

  return (
    <Main>
      <HeaderLayout
        title={formatMessage({
          id: getTrad('home.title'),
          defaultMessage: 'Publish site',
        })}
        subtitle={formatMessage({
          id: getTrad('home.description'),
          defaultMessage: 'Publishing changes to your site',
        })}
      />
      <ContentLayout>
        {busy ? (
          <>
            <Loader>Busy...</Loader>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('home.busy'),
                defaultMessage: 'The site is currently rebuilding, please wait.',
              })}
            </Typography>
          </>
        ) : (
          <>
            <Box paddingBottom={4}>
              <Typography variant="omega">
                {formatMessage({
                  id: getTrad('home.prompt'),
                  defaultMessage:
                    'Clicking the below button will trigger your site to rebuild with new content, are you sure?',
                })}
              </Typography>
            </Box>
            <Button startIcon={<Upload />} onClick={handleClick}>
              {formatMessage({
                id: getTrad('home.button.publish'),
                defaultMessage: 'Publish',
              })}
            </Button>
          </>
        )}
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
