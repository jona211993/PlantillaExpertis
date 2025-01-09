import { useState , useEffect, useRef} from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import './App.css'
import jsonData from './static/Plantilla.json';


function App() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
          
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reiniciar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined
      style={{ color: 'white' }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    // Definir una función asíncrona dentro de useEffect
    const fetchData = () => {
       setData(jsonData.PLANTILLA)  
       console.log(jsonData.PLANTILLA)  
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
      width: '30%',
      ...getColumnSearchProps('DNI'),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3f4763',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
    },
    {
      title: 'GRUPO',
      dataIndex: 'EQUIPO',
      key: 'EQUIPO',
      width: '20%',
      ...getColumnSearchProps('EQUIPO'),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3f4763',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
    },
    {
      title: 'ASESOR',
      dataIndex: 'ASESOR',
      key: 'ASESOR',
      ...getColumnSearchProps('ASESOR'),
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3f4763',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
      sorter: (a, b) => a.ASESOR.localeCompare(b.ASESOR),
      sortDirections: ['descend', 'ascend'],
    },
  ];
  
  return (
    <div className=' flex  flex-col items-center gap-10'>
      <h1 className='text-5xl font-bold font-roboto pt-5'>LISTA DE ASESORES</h1>
       <div className='w-1/2'>
       <Table columns={columns} dataSource={data} pagination={false}  scroll={{ y: '40rem' }} style={{ height: '10rem' }}  />;
       </div>
    </div>
  )
}

export default App
