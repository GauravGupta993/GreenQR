import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Detailed Information',
    description:
      'Access comprehensive scientific details about each plant in your local gardens.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Accurate Identification',
    description:
      'Ensure precise identification with our extensive database, meticulously curated for accuracy.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'User-Friendly Interface',
    description:
      'Enjoy a seamless experience with our intuitive and easy-to-use platform.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative QR Scanning',
    description:
      'Easily scan QR codes in gardens to instantly learn about various plant species.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Reliable Support',
    description:
      'Get assistance whenever needed with our responsive customer support team.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Accurate Data',
    description:
      'Benefit from precise and up-to-date information, ensuring you have the best data available.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover why our platform is the best for plant enthusiasts: detailed information, accurate identification, user-friendly interface, innovative QR scanning, reliable support, and precise data.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'hsla(220, 25%, 25%, .3)',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  boxShadow: 'none',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
