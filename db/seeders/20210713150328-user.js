'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'VHarastei',
        password: '111111',
        email: 'garastey.vas@gmail.com',
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
      {
        username: 'Biba',
        password: '222222',
        email: 'biba@gmail.com',
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
      {
        username: 'Boba',
        password: '333333',
        email: 'boba@gmail.com',
        createdAt: '1970-01-01 00:00:01',
        updatedAt: '1970-01-01 00:00:01',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
