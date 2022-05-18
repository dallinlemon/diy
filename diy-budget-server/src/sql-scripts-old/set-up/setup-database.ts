import sql from 'mssql';

async function test() {
  try {
      // make sure that any items are correctly URL encoded in the connection string
      await sql.connect('Server=localhost; Database=DIYBudgetData; User Id=sa; Password=Password1');
      console.log('Connection finished')
      // const result = await sql.query`select * from mytable where id = ${1}
      // console.dir(result)
  } catch (err) {
      // ... error checks
      console.log('------ERROR--------')
      console.log(err)

  }
}

test()