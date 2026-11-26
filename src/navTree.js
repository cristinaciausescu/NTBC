// Left-hand index. Each node has a label, optional children, and an optional id.
// Leaf nodes with an id are work items (e.g. "110013600-01 - BAHRAIN HAWK SYSTEM UPGRADE").

export const navTree = [
  {
    id: 'uk',
    label: 'UK',
    children: [
      {
        id: 'a2is',
        label: 'A2IS',
        children: [
          { id: 'aws', label: 'AWS' },
          {
            id: 'avs',
            label: 'AVS',
            children: [
              { id: 'flx', label: 'FLX' },
              {
                id: 'tts',
                label: 'TTS',
                children: [
                  {
                    id: 'bahrain',
                    label: 'Bahrain',
                    children: [
                      { id: '110013600-01', label: '110013600-01 - BAHRAIN HAWK SYSTEM UPGRADE' },
                    ],
                  },
                ],
              },
            ],
          },
          { id: 'isr', label: 'ISR' },
          { id: 'six', label: 'SIX' },
        ],
      },
      { id: 'ias', label: 'IAS' },
      {
        id: 'ome',
        label: 'OME',
        children: [
          {
            id: 'land',
            label: 'LAND',
            children: [
              {
                id: 'sharpview',
                label: 'Sharp View',
                children: [
                  { id: '110013255_CA', label: '110013255_CA - SHARPVIEW HD TI CAMERA' },
                ],
              },
            ],
          },
          { id: 'sea', label: 'SEA' },
          { id: 'air', label: 'AIR' },
        ],
      },
      { id: 'uws', label: 'UWS' },
    ],
  },
];
