Package.describe({
  name: 'jhunlouiegonzales:biz-counter',
  version: '0.0.2',
  summary: 'Atomic counters stored in MongoDB',
  git: '',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('2.6.1');
  api.use('ecmascript');
  api.mainModule('biz-counter.js');
  api.use(['mongo@1.14.6', 'dburles:mongo-collection-instances@0.3.6']);
  api.export('incrementCounter', 'server');
  api.export('setCounter', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jhunlouiegonzales:biz-counter');
  api.mainModule('biz-counter-tests.js');
});
