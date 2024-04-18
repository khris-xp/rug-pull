import Button from '@/components/Button/Button';
import Dropdown from '@/components/Button/Dropdown';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import useSnackbarToast from '@/hooks/useSnackbar';
import { roomService } from '@/services/room.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRoomList } from '@/store/room/room.slice';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RoomDashboardDeatilsPage() {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [capacity, setCapacity] = useState<number>();
  const [status, setStatus] = useState<string>('');
  const [statusDropdown, setStatusDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbarToast();
  const statusList = useAppSelector((state) => state.status.statusList);
  const tables = useAppSelector((state) => state.table.tableList);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const toggleStatusDropdown = () => {
    setStatusDropdown(!statusDropdown);
  };

  const fetchRoomById = useCallback(async () => {
    const response = await roomService.getRoomById(id);
    setName(response.data.name);
    setCapacity(response.data.capacity);
    setStatus(response.data.status);
    setSelectedTables(response.data.tables);
  }, [id]);

  const handleTableClick = (id: string) => {
    if (selectedTables.includes(id)) {
      setSelectedTables(selectedTables.filter((table) => table !== id));
    } else {
      setSelectedTables([...selectedTables, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (capacity) {
        const response = await roomService.createRoom({
          name,
          capacity,
          status,
          tables: selectedTables,
        });
        setName('');
        setCapacity(0);
        const room_response = await roomService.getAllRoom();
        dispatch(setRoomList(room_response.data));

        if (response.success) {
          showSnackbar('Room created successfully', 'success');
          window.location.href = '/dashboard/room';
        } else {
          showSnackbar('Failed to create room', 'error');
        }
      }
    } catch (error) {
      showSnackbar('Failed to create room', 'error');
    }
  };

  useEffect(() => {
    fetchRoomById();
  }, [fetchRoomById]);

  return (
    <div className='bg-white p-8 rounded shadow-md max-w-3xl w-full mx-auto mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>Edit Room</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Room Name
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'text',
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: 'Room Name',
                isFull: true,
              }}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Capacity
            </label>
            <Spacer margin='my-2' />
            <Input
              props={{
                variant: 'number',
                value: capacity,
                onChange: (e) => setCapacity(Number(e.target.value)),
                placeholder: 'Capacity',
                isFull: true,
              }}
            />
          </div>
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Room Status
          </label>
          <Spacer margin='my-2' />
          <Dropdown
            props={{
              onClick: () => toggleStatusDropdown(),
              text: status || 'Status',
              list: statusList.map((status) => status.name),
              open: statusDropdown,
              onToggle: () => toggleStatusDropdown(),
              onSelectItem: (e: string) => setStatus(e),
            }}
          />
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Select Room Table
          </label>
          <Spacer margin='my-2' />
          <div className='mt-3 flex select-none flex-wrap items-center gap-1'>
            {tables.map((table) => (
              <div
                onClick={() => handleTableClick(table._id)}
                className={`px-6 py-2 ${
                  selectedTables.includes(table._id)
                    ? 'bg-black text-white'
                    : 'text-black bg-white'
                } border border-black rounded-lg font-bold duration-100 cursor-pointer`}
              >
                {table.number}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6'>
          <Button
            props={{
              type: 'submit',
              text: 'Edit Room',
            }}
            variant={{
              textColor: 'text-white',
              isHover: true,
              padding: 'w-full px-5 py-2.5',
              fontWeight: 'font-normal',
              borderRadius: 'rounded-lg',
              color: 'bg-primary',
              textAlign: 'center',
              textSize: 'text-base',
            }}
          />
        </div>
      </form>
    </div>
  );
}
