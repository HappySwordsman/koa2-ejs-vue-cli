/* user 路由 */
function transaction(router) {
  router.get("/mock/transaction/list", function (ctx) {
    ctx.body = {
      code: 200,
      data: {
        total: 20,
        items: [
          {
            order_no: "EbbAD4C2-f4C3-AF0F-EeD1-De923bde4A88",
            timestamp: 1599925817159,
            username: "Deborah Martin",
            price: 3869.28,
            status: "pending",
          },
          {
            order_no: "a65987A9-9ddC-3dD8-468f-CBd14B535EcD",
            timestamp: 1599925817159,
            username: "Lisa Robinson",
            price: 11815.7,
            status: "pending",
          },
          {
            order_no: "32F1A82d-79EB-3CfF-54Fb-c60a1663FceF",
            timestamp: 1599925817159,
            username: "Ruth Wilson",
            price: 2224,
            status: "pending",
          },
          {
            order_no: "c5e4cCc6-EF43-f425-e251-efDAba82EB6f",
            timestamp: 1599925817159,
            username: "Larry Perez",
            price: 10689,
            status: "success",
          },
          {
            order_no: "BA6818d3-A73A-46CD-1DA2-1EfB68c5beFC",
            timestamp: 1599925817159,
            username: "Gary Thomas",
            price: 1048.94,
            status: "success",
          },
          {
            order_no: "59f17c78-b92F-b5B7-d1ff-FcdDE2ff6cdb",
            timestamp: 1599925817159,
            username: "Patricia Brown",
            price: 9603.3,
            status: "success",
          },
          {
            order_no: "FEc4e808-5bcA-6e4E-5Cdd-f6d8bAbFFDbD",
            timestamp: 1599925817159,
            username: "Nancy Robinson",
            price: 10955,
            status: "pending",
          },
          {
            order_no: "4bFFC4dA-e6BC-c2CD-7DDc-8F7b3f67dE43",
            timestamp: 1599925817159,
            username: "Timothy Martinez",
            price: 1361,
            status: "success",
          },
          {
            order_no: "BBebf466-474f-BAD6-12e6-94A6cF9d4EFB",
            timestamp: 1599925817159,
            username: "William Taylor",
            price: 5521.9,
            status: "pending",
          },
          {
            order_no: "fBB5c658-6389-9CAC-fDcF-87e99cA1888F",
            timestamp: 1599925817159,
            username: "Joseph Moore",
            price: 3816,
            status: "success",
          },
          {
            order_no: "1C9B3Dd3-C4fd-4D0c-772F-1E81c6CfC85B",
            timestamp: 1599925817159,
            username: "David Hernandez",
            price: 8109.6,
            status: "pending",
          },
          {
            order_no: "f2dC4414-E3AB-94FD-DeEB-FdDbaC2c721d",
            timestamp: 1599925817159,
            username: "Sandra Lee",
            price: 11305.2,
            status: "pending",
          },
          {
            order_no: "C2b371Fa-103C-a4Dc-C8C8-DADC4a569DdF",
            timestamp: 1599925817159,
            username: "Dorothy Robinson",
            price: 3209,
            status: "pending",
          },
          {
            order_no: "DADEE8bc-b785-88Fc-cBAe-AfC5e29eEF15",
            timestamp: 1599925817159,
            username: "Ronald Miller",
            price: 13582.5,
            status: "pending",
          },
          {
            order_no: "7f5cC8fE-9cCA-Eee2-2E7E-22BAB1B313eB",
            timestamp: 1599925817159,
            username: "Larry Robinson",
            price: 10444.3,
            status: "success",
          },
          {
            order_no: "E3bBCEEf-cEDc-daDa-8A77-121c6FFD3EbF",
            timestamp: 1599925817159,
            username: "Eric Brown",
            price: 10475.4,
            status: "success",
          },
          {
            order_no: "87B32298-72dc-cf9C-B08c-f890A746eA3D",
            timestamp: 1599925817159,
            username: "Jeffrey Smith",
            price: 7147.3,
            status: "pending",
          },
          {
            order_no: "7BEDe93A-507C-Db86-3dB0-D1Eac361dbE6",
            timestamp: 1599925817159,
            username: "Joseph Anderson",
            price: 13745.8,
            status: "pending",
          },
          {
            order_no: "6cf38ACA-32E9-fe74-0555-F9226D370AB5",
            timestamp: 1599925817159,
            username: "Patricia Miller",
            price: 8497.5,
            status: "pending",
          },
          {
            order_no: "6ac5cC3f-DF5d-6B76-dbBC-fAF681A8DEfa",
            timestamp: 1599925817159,
            username: "Deborah Harris",
            price: 10155.9,
            status: "success",
          },
        ],
      },
    };
  });
}

module.exports = transaction;
