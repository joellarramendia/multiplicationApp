import { CreateTable, CreateTableOptions } from '../../domain/use-cases/create-table.use-cases'
import { Options } from '../../domain/use-cases/save-file.use-case'
import { SaveFile } from '../../domain/use-cases/save-file.use-case'
import { ServerApp } from '../../presentation/server-app'
import { jest } from '@jest/globals'


describe('server app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp()
        expect(serverApp).toBeInstanceOf(ServerApp)
        expect(typeof ServerApp.run).toBe('function')
    })


    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log')
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')


        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('Server running')
        expect(logSpy).toHaveBeenCalledWith('File Created!')

        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit })

        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })

    })


    test('should run with custom values mocked', () => {
        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        // const createMock = jest.fn()
        const createMock = jest.fn<(options: CreateTableOptions) => string>();
        createMock.mockReturnValue('1 x 2 = 2')
        // const saveFileMock = jest.fn()
        const saveFileMock = jest.fn<(options: Options) => boolean>();
        saveFileMock.mockReturnValue(true)

        console.log = logMock
        console.error = logErrorMock

        CreateTable.prototype.execute = createMock
        SaveFile.prototype.execute = saveFileMock

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('Server running')
        expect(createMock).toHaveBeenCalledWith({'base': options.base, 'limit': options.limit})
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            fileName: options.fileName
        })
        // expect(logMock).toHaveBeenCalledWith()
        expect(logErrorMock).not.toHaveBeenCalledWith()

    })

})