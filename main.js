
    let jsonData;
    fetch('combined.json')
        .then(response => response.json())
        .then(data => {
             jsonData = data;
            let tableBody = '';
            data.forEach((item, index) =>  {
                tableBody += `<tr>
                    <td><button onclick="showDetails(${index})"><img width=100 src=${item.customAttributes.product.image}></button></td>
<td><a href="https://www.amazon.com/s?k=book for ${item.normalizedTitle}" target="_blank">${item.normalizedTitle}</a>
<br/>
<br/><a href="https://www.libgen.is/search.php?req=${item.normalizedTitle}">libgen search</a>
</td>
                    <td>${item.normalizedFirstAuthor}</td>
                    <td>${item.community.name}</td>
                    <td>${item.readCount - item.lifeShortCount}</td>
                    <td>${item.readCount}</td>
                    <td>${item.lifeShortCount}</td>
                </tr>`;
            });
            document.querySelector("#books tbody").innerHTML = tableBody;
        $('#books').DataTable({aLengthMenu: [ [ 50, 100, 200 ], [ 50, 100, 200] ],
columns: [
    null,
    null,
    { "width": "15%" },
    null,
    null,
    null,
    null
  ]
        })
              .order( [ 4, 'desc' ] )
                      .draw();
            filter();
        });

    function filter(){
      var table = $('#books').DataTable();
       
          var select = $('<select />')
              .appendTo(
                  table.column(3).header()
              )
              .on( 'change', function () {
                 if ( this.value == 'all' ) {
                  table
                      .column(3)
                      .search( '' )
                  } else {
                  table
                      .column(3)
                      .search( $(this).val() )
            }
                  table
              .order( [ 4, 'desc' ] )
                      .draw();
              } );
       
          select.append( '<option value=all>All</option>') ;
          table
              .column(3)
              .cache( 'search' )
              .sort()
              .unique()
              .each( function ( d ) {
                  select.append( $('<option value="'+d+'">'+d+'</option>') );
              } );
    }
    document.getElementById('detailView').addEventListener('click', function() { this.style.display = 'none'; });
    function showDetails(index) {
      if($('#detailView:visible').length == 0) {
        const item = jsonData[index];
        let list = '';
        document.getElementById('detailView').innerHTML = '';
        if(item.earliestNotes) {
          item.earliestNotes.map(obj => obj.text).forEach((text) => {
            list += `<li>${text}</li>`
          })
          list = `<ul>${list}</ul>`
          };
        const detailView = document.getElementById('detailView')
        detailView.innerHTML = `<ul>${list}</ul>`;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        detailView.style.left = (event.clientX + scrollX) + 'px';
        detailView.style.top = (event.clientY + scrollY) + 'px';
        detailView.style.display = 'block';
        } else {
          document.getElementById('detailView').style.display = 'none';
        }

    }
