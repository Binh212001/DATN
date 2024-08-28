package org.example.yodybe.utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Component
public class FileHandler {
    private final String imagesDirectory;
    public FileHandler(@Value("${resources.images.directory}") String imagesDirectory) {
        this.imagesDirectory = imagesDirectory;
    }
    public  List<String> saveUploadedFile(List<MultipartFile> file) throws IOException {
        if (file.isEmpty()) {
            return null;
        }

        try {
            // Save uploaded file to disk
            List<String> listFileName = new ArrayList<>();;
            for (MultipartFile f : file){
            byte[] bytes = f.getBytes();
            String fileName = UUID.randomUUID() +f.getOriginalFilename();
            String urlPath = imagesDirectory +fileName;
            Path path = Paths.get(urlPath);
            Files.write(path, bytes);
            listFileName.add(fileName);
            }
            return listFileName;
        } catch (IOException e) {
            throw new  IOException("Save file Error: " + e.getMessage());
        }
    }

    public List<String> updateUploadedFile(List<MultipartFile> image, List<String> productImage) {
        try {
            for (String img : productImage){
                Path path = Paths.get(imagesDirectory + img);
                Files.deleteIfExists(path);
            }
            return saveUploadedFile(image);
        }catch (IOException e) {
            try {
                throw new  IOException("Update file Error: " + e.getMessage());
            } catch (IOException ex) {
                throw new RuntimeException("Update file Error: " + e.getMessage());
            }
        }
    }
}
