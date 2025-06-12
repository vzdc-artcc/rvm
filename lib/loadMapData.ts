'use server';
import fs from 'fs/promises'
import path from 'path'

export interface VideoMap {
    number: number
    shortName: string
    longName: string
    briteGroup: string
}

export interface Facility {
    name: string
    maps: VideoMap[]
}

export async function loadMapData(): Promise<Facility[]> {
    try {
        // Get the data directory path
        const dataDir = path.join(process.cwd(), 'data')

        // Read all files in the directory
        const files = await fs.readdir(dataDir)

        // Filter for .json files and read them all
        const jsonFiles = files.filter(file => file.endsWith('.json'))
        const mapDataPromises = jsonFiles.map(async (file) => {
            const filePath = path.join(dataDir, file)
            const fileContent = await fs.readFile(filePath, 'utf-8')
            return JSON.parse(fileContent) as Facility
        })

        // Wait for all files to be read and parsed
        return (await Promise.all(mapDataPromises)).sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        console.error('Error loading map data:', error)
        throw error
    }
}