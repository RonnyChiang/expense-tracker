// delete.js is only applied to index.hbs and edit.hbs
const deleteButtons = document.querySelectorAll('.delete-button')


// loop all queried delete buttons DOM object
deleteButtons.forEach(deleteButton => {
  console.log("go")
  // attach event listeners for each of them 
  deleteButton.addEventListener('click', async event => {
    event.stopPropagation()
    event.preventDefault()
    let result = null
    result = await Swal.fire({
      title: '你要確定餒',
      text: '確定要刪除？',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      await Swal.fire(
        'Deleted!',
        '成功刪除囉！',
        'success'
      )
      deleteButton.parentElement.submit()
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Cancelled',
        '還是留著吧',
        'error'
      )
    }
  })
})