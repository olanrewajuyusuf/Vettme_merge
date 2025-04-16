import { baseUrl } from '@/api/baseUrl';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Company {
  id: string;
  companyName: string;
}

function AllChats() {
  const adminToken = sessionStorage.getItem('adminToken');
  const adminId = sessionStorage.getItem('adminId');
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const res = await axios.get(`${baseUrl}/company`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        const companies = res.data.result.companies.filter((company: any)=> company.id !== adminId)        
        setCompanies(companies);
      } catch (err) {
        console.error(err);
      }
    };
    getAllCompanies();
  }, [adminToken, adminId]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
      {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Chats</h2> */}
      <div className="bg-white shadow-md rounded-lg p-4 max-w-2xl mx-auto">
        {companies.length === 0 ? (
          <p className="text-gray-500 text-center">No chats available</p>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <Link
                to={`/back-office/all-chats/${company.id}`}
                key={company.id}
                className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-lg">
                    {company.companyName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{company.companyName}</p>
                    <p className="text-sm text-gray-600">Tap to chat</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllChats;
