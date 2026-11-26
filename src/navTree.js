import { needsYou, milestones } from './data.js';

// Left-hand index. Each node has an id and a label. Nodes with children are groups.
// Leaves with a `kind` ("task" or "milestone") can be picked to build a working package.

const taskLeaves = (prefix) =>
  needsYou.map((t) => ({
    id: `${prefix}-task-${t.id}`,
    label: t.title,
    kind: 'task',
    meta: { title: t.title, type: t.type, effort: t.effort, xp: t.xp },
  }));

const milestoneLeaves = (prefix) =>
  milestones.map((m) => ({
    id: `${prefix}-ms-${m.id}`,
    label: `${m.label} (${m.count})`,
    kind: 'milestone',
    meta: { title: m.label, sub: m.sub, xp: m.xp },
  }));

// A work item groups its own Tasks and Milestones.
const workItem = (id, label) => ({
  id,
  label,
  children: [
    { id: `${id}-tasks`, label: 'Tasks', children: taskLeaves(id) },
    { id: `${id}-milestones`, label: 'Milestones', children: milestoneLeaves(id) },
  ],
});

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
                    children: [workItem('110013600-01', '110013600-01 - BAHRAIN HAWK SYSTEM UPGRADE')],
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
                children: [workItem('110013255_CA', '110013255_CA - SHARPVIEW HD TI CAMERA')],
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
