import dayjs from 'dayjs';
import { timeFormat } from 'const/nuclias/dateFormat';

export const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

export const defaultPathList = [
  { label: 'Monitor', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Event log', isLink: false },
];

export const defaultSeverityList = [
  { title: 'Critical', checked: true },
  { title: 'Warning', checked: true },
  { title: 'Information', checked: true },
];

export const defaultCategoryList = [
  {
    index: 1,
    parentId: 1,
    name: 'connectivity',
    title: 'Connectivity',
    checked: true,
    level: 'first',
    list: [
      { title: 'Device disconnected', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Device reset to factory', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Device connected', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Sub BLE device paired', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Sub BLE device unPaired', checked: true, level: 'second', customKey: 'a', parentId: 1 },
    ],
  },
];

export const defaultDeviceList = [
  { title: 'Gateway0001', checked: true },
  { title: 'Gateway0002', checked: true },
  { title: 'Gateway0003', checked: true },
  { title: 'Gateway0004', checked: true },
  { title: 'Gateway0005', checked: true },
];

export const defaultEventLogList = [
  {
    time: dayjs()
      .subtract(Math.random() * 1000, 'second')
      .format(timeFormat.yDateAndTime),
    deviceName: 'Gateway0003',
    macAddress: '66:4E:31:03:69:96',
    severity: 'Information',
    category: 'Connectivity',
    eventType: 'Device disconnected',
    eventDescription: '',
  },
  {
    time: dayjs()
      .subtract(Math.random() * 1000, 'second')
      .format(timeFormat.yDateAndTime),
    deviceName: 'Gateway0002',
    macAddress: '3D:EC:52:21:4E:9B',
    severity: 'Information',
    category: 'Connectivity',
    eventType: 'Device reset to factory',
    eventDescription: '',
  },
  {
    time: dayjs()
      .subtract(Math.random() * 1000, 'second')
      .format(timeFormat.yDateAndTime),
    deviceName: 'Gateway0003',
    macAddress: '66:4E:31:03:69:96',
    severity: 'Information',
    category: 'Connectivity',
    eventType: 'Device connected',
    eventDescription: '',
  },
  {
    time: dayjs()
      .subtract(Math.random() * 1000, 'second')
      .format(timeFormat.yDateAndTime),
    deviceName: 'Gateway0001',
    macAddress: '23:EA:69:4C:A4:CA',
    severity: 'Information',
    category: 'Connectivity',
    eventType: 'Sub BLE device paired',
    eventDescription: '',
  },
  {
    time: dayjs()
      .subtract(Math.random() * 1000, 'second')
      .format(timeFormat.yDateAndTime),
    deviceName: 'Gateway0001',
    macAddress: '23:EA:69:4C:A4:CA',
    severity: 'Information',
    category: 'Connectivity',
    eventType: 'Sub BLE device unPaired',
    eventDescription: '',
  },
];
