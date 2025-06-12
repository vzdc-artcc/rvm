import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box, Card, CardContent, Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Typography
} from "@mui/material";
import {loadMapData} from "@/lib/loadMapData";
import { ExpandMore } from "@mui/icons-material";
import RvmSearchForm from "@/components/Search/RvmSearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, in?: string }> }) {

  const mapData = await loadMapData();

  const { q, in: inFacility } = await searchParams;

  const filteredMapData = mapData.filter((f) => {
      if (inFacility) {
          return f.name.toLowerCase() === inFacility.toLowerCase();
      }
      return f.maps.some((m) =>
          !q
          || m.shortName.toLowerCase().includes(q.toLowerCase())
          || m.longName.toLowerCase().includes(q.toLowerCase())
      );
  });

  return (
      <Stack direction="column" spacing={2}>
          <RvmSearchForm facilities={mapData.map((f) => f.name)} />
          { filteredMapData.length === 0 && (
              <Card>
                  <CardContent>
                      <Typography variant="subtitle2">No results found.</Typography>
                  </CardContent>
              </Card>
          )}
          <Box>
              { filteredMapData.length > 0 &&
                  filteredMapData
                      .map((facility, idx) => (
                          <Accordion key={idx}>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                  <Typography variant="h6">{facility.name}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                  <TableContainer>
                                      <Table size="small">
                                          <TableHead>
                                              <TableRow>
                                                  <TableCell sx={{ textAlign: 'center', }}>Map #</TableCell>
                                                  <TableCell sx={{ textAlign: 'center', }}>Short Name</TableCell>
                                                  <TableCell sx={{ textAlign: 'center', }}>Long Name</TableCell>
                                                  <TableCell sx={{ textAlign: 'center', }}>Brite Group</TableCell>
                                              </TableRow>
                                          </TableHead>
                                          <TableBody>
                                              {facility.maps
                                                  .filter((m) =>
                                                      !q
                                                      || m.shortName.toLowerCase().includes(q.toLowerCase())
                                                      || m.longName.toLowerCase().includes(q.toLowerCase()))
                                                  .map((map) => (
                                                      <TableRow key={map.number}>
                                                          <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', }}>{map.number}</TableCell>
                                                          <TableCell sx={{ textAlign: 'center', }}>{map.shortName}</TableCell>
                                                          <TableCell sx={{ textAlign: 'center', }}>{map.longName}</TableCell>
                                                          <TableCell sx={{ textAlign: 'center', }}>{map.briteGroup}</TableCell>
                                                      </TableRow>
                                                  ))}
                                          </TableBody>
                                      </Table>
                                  </TableContainer>
                              </AccordionDetails>
                          </Accordion>
                      ))}
          </Box>
      </Stack>
  );

}
