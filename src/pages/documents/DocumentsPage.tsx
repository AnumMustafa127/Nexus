import React, { useEffect, useState } from 'react';
import { FileText, Upload, Download, Trash2, Share2, Eye, FileSignature } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import Signpad from '../../components/uploadDoc/Signpad'

const initialDocuments = [   // renamed to initialDocuments so it acts as default data
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    shared: false,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    shared: true,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    shared: false,
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const DocumentsPage: React.FC = () => {

  const [documents, setDocuments] = useState(initialDocuments)

  useEffect(() => {
    const storedFiles = localStorage.getItem('uploaded-File')
    const signStatus = localStorage.getItem('docStatus')

    let updatedDocs = [...initialDocuments]

    if (storedFiles) {
      const parsedFiles = JSON.parse(storedFiles)
      updatedDocs = [...updatedDocs, ...parsedFiles]
    }

    if (signStatus) {
      const parsedStatus = JSON.parse(signStatus)
      const signedIds = parsedStatus.map(item => item.id)
      updatedDocs = updatedDocs.map(doc => ({
        ...doc,
        signStatus: signedIds.map(Number).includes(doc.id)

      }))
      console.log(updatedDocs)
    }
    setDocuments(updatedDocs)
  }, [])


  function popItem(id: number) {
    const filteredDocs = documents.filter(doc => doc.id != id)
    setDocuments(filteredDocs)
  }


  return (
    <div className="space-y-6 animate-fade-in">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <Link to='/Uploadpg'>
          <Button id='upload' leftIcon={<Upload size={18} />}>
            Upload Document
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>
          </CardBody>
        </Card>


        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>

            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
            </CardHeader>

            <CardBody>

              <div className="space-y-2">

                {documents.map(doc => (

                  <div key={doc.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">

                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                        {doc.signStatus ? <Badge variant='secondary' size='sm' >Signed</Badge> : <Badge variant='primary' size='sm' >Draft</Badge>}

                        {doc.shared && <Badge variant="secondary" size="sm">Shared</Badge>}
                      </div>

                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">

                      <Button variant="ghost" size="sm" className="p-2">
                        <Download size={18} />
                      </Button>

                      <Button variant="ghost" size="sm" className="p-2">
                        <Share2 size={18} />
                      </Button>

                      {/* view button added */}
                      <Button onClick={() => { window.open(doc.url, '_blank') }} variant="ghost" size="sm" className="p-2">
                        <Eye size={18} />
                      </Button>
                      {/* sign pad button */}
                      <Link to={`/Signpad/${doc.id}`}>
                        <Button variant="ghost" size="sm" className="p-2">
                          <FileSignature size={18} />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => popItem(doc.id)}
                        variant="ghost"
                        size="sm"
                        className="p-2 text-error-600 hover:text-error-700"
                      >
                        <Trash2 size={18} />
                      </Button>

                    </div>

                  </div>

                ))}

              </div>

            </CardBody>

          </Card>
        </div>

      </div>

    </div>
  );
};