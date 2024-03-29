'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [
			{
				roleId: 'R1',
				positionId: 'P0',
				firstName: 'John',
				lastName: 'Doe',
				image: '',
				email: 'john@gmail.com',
				password: await bcrypt.hashSync('john123', salt),
				address: 'Hoc Mon, TP. Ho Chi Minh',
				gender: 'M',
				phone: '0939584501',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R2',
				positionId: 'P1',
				firstName: 'Lena',
				lastName: 'Caron',
				image: '',
				email: 'lena@gmail.com',
				password: await bcrypt.hashSync('lena123', salt),
				address: 'Quan 1, TP. Ho Chi Minh',
				gender: 'F',
				phone: '0939584502',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R3',
				positionId: 'P2',
				firstName: 'Luke',
				lastName: 'Russell',
				image: '',
				email: 'luke@gmail.com',
				password: await bcrypt.hashSync('luke123', salt),
				address: 'Tan Binh, TP. Ho Chi Minh',
				gender: 'M',
				phone: '0939584503',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R2',
				positionId: 'P3',
				firstName: 'Celine',
				lastName: 'Dion',
				image: '',
				email: 'celine@gmail.com',
				password: await bcrypt.hashSync('celine123', salt),
				address: 'Quan 5, TP. Ho Chi Minh',
				gender: 'F',
				phone: '0939584504',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R1',
				positionId: 'P4',
				firstName: 'Donal',
				lastName: 'Duck',
				image: '',
				email: 'donal@gmail.com',
				password: await bcrypt.hashSync('donal123', salt),
				address: 'Quan 3, TP. Ho Chi Minh',
				gender: 'M',
				phone: '0939584505',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R2',
				positionId: 'P2',
				firstName: 'Smith',
				lastName: 'Cage',
				image: '',
				email: 'smith@gmail.com',
				password: await bcrypt.hashSync('smith123', salt),
				address: 'Quan 6, TP. Ho Chi Minh',
				gender: 'M',
				phone: '0939584506',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R3',
				positionId: 'P1',
				firstName: 'Mac',
				lastName: 'Donald',
				image: '',
				email: 'mac@gmail.com',
				password: await bcrypt.hashSync('mac123', salt),
				address: 'Quan 9, TP. Ho Chi Minh',
				gender: 'M',
				phone: '0939584507',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R2',
				positionId: 'P4',
				firstName: 'Laury',
				lastName: 'Prosacco',
				image: '',
				email: 'laury@gmail.com',
				password: await bcrypt.hashSync('laury123', salt),
				address: 'Binh Tan, TP. Ho Chi Minh',
				gender: 'F',
				phone: '0939584508',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				roleId: 'R2',
				positionId: 'P0',
				firstName: 'Lavinia',
				lastName: 'Crist',
				image: '',
				email: 'lavinia@gmail.com',
				password: await bcrypt.hashSync('lavinia123', salt),
				address: 'Binh Chanh, TP. Ho Chi Minh',
				gender: 'F',
				phone: '0939584509',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
