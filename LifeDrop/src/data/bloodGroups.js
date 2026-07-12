const bloodGroups = [
  {
    id: 1,
    name: 'A+',
    description: 'One of the most common blood types, found in a large portion of the population.',
    compatibility: 'A+, AB+',
  },
  {
    id: 2,
    name: 'A-',
    description: 'A rarer negative type that can donate to both positive and negative A/AB groups.',
    compatibility: 'A+, A-, AB+, AB-',
  },
  {
    id: 3,
    name: 'B+',
    description: 'Common in certain populations, useful for a wide range of recipients.',
    compatibility: 'B+, AB+',
  },
  {
    id: 4,
    name: 'B-',
    description: 'A rarer type that plays a key role in emergency transfusions.',
    compatibility: 'B+, B-, AB+, AB-',
  },
  {
    id: 5,
    name: 'AB+',
    description: 'Known as the universal recipient, able to receive from all blood types.',
    compatibility: 'AB+',
  },
  {
    id: 6,
    name: 'AB-',
    description: 'A rare type that can receive from all negative blood groups.',
    compatibility: 'AB+, AB-',
  },
  {
    id: 7,
    name: 'O+',
    description: 'The most common blood type, widely used in emergency transfusions.',
    compatibility: 'O+, A+, B+, AB+',
  },
  {
    id: 8,
    name: 'O-',
    description: 'Known as the universal donor, compatible with every blood type.',
    compatibility: 'Everyone',
  },
];

export default bloodGroups;